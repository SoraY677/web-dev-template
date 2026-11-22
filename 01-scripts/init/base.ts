import {spawnSync} from 'node:child_process';

import {getGhToken} from '../utils/gh.js';

// ghのトークンをterraformへ渡してapplyする（トークンはファイルに残さない）
export const applyBase = () => {
  const result = spawnSync('terraform', ['-chdir=02-config/repo', 'apply', '-auto-approve'], {
    stdio: 'inherit',
    env: {...process.env, GITHUB_TOKEN: getGhToken()},
  });

  if (result.status !== 0) {
    throw new Error(`terraform apply failed (exit code: ${result.status})`);
  }
};
