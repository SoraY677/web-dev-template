import {gh} from '../utils/gh.js';

// Projectを作成し、リポジトリに紐づける
export const createProject = (owner: string, repository: string) => {
  const json = gh(['project', 'create', '--owner', owner, '--title', `[KANBAN] ${repository}`, '--format', 'json']);
  const {number, url} = JSON.parse(json) as {number: number; url: string};
  console.log(`created: ${url}`);

  // 紐づけないとリポジトリのProjectsタブに出てこない
  gh(['project', 'link', String(number), '--owner', owner, '--repo', `${owner}/${repository}`], 'inherit');
  console.log(`linked to ${owner}/${repository}`);
};
