import {execFileSync, type StdioOptions} from 'node:child_process';

// 環境変数のトークンはghの保存済みログインより優先されてしまう。
// 無効な値が残っていても影響を受けないよう、gh実行時は除外する
const ghEnv = () => {
  const {GITHUB_TOKEN: _github, GH_TOKEN: _gh, ...env} = process.env;
  return env;
};

export const gh = (args: string[], stdio: StdioOptions = ['ignore', 'pipe', 'inherit']): string =>
  execFileSync('gh', args, {encoding: 'utf-8', stdio, env: ghEnv()});

// ログイン済みトークンが持つスコープ一覧を取得する
const getScopes = () => {
  const res = gh(['api', '-i', 'user'], ['ignore', 'pipe', 'ignore']);
  const line = res.split(/\r?\n/).find((l) => l.toLowerCase().startsWith('x-oauth-scopes:')) ?? '';
  // スコープ名自体にコロンを含む(read:orgなど)ので、最初のコロンより後ろ全体を使う
  return line.slice(line.indexOf(':') + 1).split(',').map((s) => s.trim()).filter(Boolean) ?? [];
};

// 未ログイン、またはスコープ不足の場合はghの認証を対話的に実行する
export const ensureGhLogin = (requiredScopes: string[] = []) => {
  try {
    gh(['auth', 'status'], 'ignore');
  } catch {
    console.warn('gh is not logged in. starting login...');
    gh(['auth', 'login', ...requiredScopes.flatMap((s) => ['-s', s])], 'inherit');
    return;
  }

  if (requiredScopes.length === 0) {
    return;
  }
  const missing = requiredScopes.filter((s) => !getScopes().includes(s));
  if (missing.length > 0) {
    console.warn(`gh token lacks scope: ${missing.join(', ')}. refreshing...`);
    gh(['auth', 'refresh', ...missing.flatMap((s) => ['-s', s])], 'inherit');
  }
};

// ghのアクセストークンを取得する
export const getGhToken = () => {
  ensureGhLogin();
  return gh(['auth', 'token']).trim();
};
