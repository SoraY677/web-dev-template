import {execFileSync} from 'node:child_process';

// 未ログインの場合はghのログインを対話的に実行する
export const ensureGhLogin = () => {
  try {
    execFileSync('gh', ['auth', 'status'], {stdio: 'ignore'});
  } catch {
    console.warn('gh is not logged in. starting login...');
    execFileSync('gh', ['auth', 'login'], {stdio: 'inherit'});
  }
};

// ghのアクセストークンを取得する
export const getGhToken = () => {
  ensureGhLogin();
  return execFileSync('gh', ['auth', 'token'], {encoding: 'utf-8'}).trim();
};
