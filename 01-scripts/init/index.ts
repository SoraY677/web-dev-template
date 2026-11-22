import {ensureGhLogin} from '../utils/gh.js';

import {applyBase} from './base.js';
import {createProject} from './projects.js';

const {GITHUB_OWNER, GITHUB_REPOSITORY} = process.env;
if (!GITHUB_OWNER || !GITHUB_REPOSITORY) {
  throw new Error('GITHUB_OWNER / GITHUB_REPOSITORY is not set. check .env');
}

// 認証は最初に1回だけ（projectスコープも含める）
ensureGhLogin(['project']);

applyBase();
createProject(GITHUB_OWNER, GITHUB_REPOSITORY);
