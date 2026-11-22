import {gh} from '../utils/gh.js';

type Project = {number: number; title: string; url: string};

// 同名のProjectがあればそれを返す
const findProject = (owner: string, title: string) => {
  const json = gh(['project', 'list', '--owner', owner, '--limit', '100', '--format', 'json']);
  const {projects} = JSON.parse(json) as {projects: Project[]};
  return projects.find((p) => p.title === title);
};

// Projectを作成し、リポジトリに紐づける（同名のProjectがあれば作成はスキップ）
export const createProject = (owner: string, repository: string) => {
  const title = `[KANBAN] ${repository}`;

  let project = findProject(owner, title);
  if (project) {
    console.log(`project already exists. skip create: ${project.url}`);
  } else {
    const json = gh(['project', 'create', '--owner', owner, '--title', title, '--format', 'json']);
    project = JSON.parse(json) as Project;
    console.log(`created: ${project.url}`);
  }

  // 紐づけないとリポジトリのProjectsタブに出てこない
  try {
    gh(['project', 'link', String(project.number), '--owner', owner, '--repo', `${owner}/${repository}`], 'inherit');
    console.log(`linked to ${owner}/${repository}`);
  } catch {
    console.warn('link failed (already linked?). continue...');
  }
};
