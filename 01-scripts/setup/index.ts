import {existsSync, readFileSync, writeFileSync} from 'node:fs';

import {ensureGhLogin, gh} from '../utils/gh.js';

const ENV_PATH = '.env';
const ENV_TEMPLATE_PATH = '.env.template';

// ghコマンドでオーナー名とリポジトリ名を取得する
const getRepoInfo = () => {
  ensureGhLogin();

  const json = gh(['repo', 'view', '--json', 'owner,name']);
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

