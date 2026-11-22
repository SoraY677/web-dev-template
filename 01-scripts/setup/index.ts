import {execFileSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';

const ENV_PATH = '.env';
const ENV_TEMPLATE_PATH = '.env.template';

// 未ログインの場合はghのログインを対話的に実行する
const ensureGhLogin = () => {
  try {
    execFileSync('gh', ['auth', 'status'], {stdio: 'ignore'});
  } catch {
    console.warn('gh is not logged in. starting login...');
    execFileSync('gh', ['auth', 'login'], {stdio: 'inherit'});
  }
};

// ghコマンドでオーナー名とリポジトリ名を取得する
const getRepoInfo = () => {
  ensureGhLogin();

  const json = execFileSync('gh', ['repo', 'view', '--json', 'owner,name'], {
    encoding: 'utf-8',
  });
  const {owner, name} = JSON.parse(json) as {owner: {login: string}; name: string};
  return {owner: owner.login, name};
};

// copy env file
if (existsSync(ENV_PATH)) {
  console.warn('env found! copy skip...');
  process.exit();
}

const {owner, name} = getRepoInfo();

const values: Record<string, string> = {
  GITHUB_OWNER: owner,
  GITHUB_REPOSITORY: name,
};

// ${XXX} 形式の変数を置換する（未定義の変数はそのまま残す）
const env = readFileSync(ENV_TEMPLATE_PATH, 'utf-8').replace(
  /\$\{(\w+)\}/g,
  (match: string, key: string) => values[key] ?? match,
);

writeFileSync(ENV_PATH, env);

