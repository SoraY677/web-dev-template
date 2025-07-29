/**
 * コンテキスト情報
 */
export const Context = {
  GITHUB_REPO_OWNER: 'githubRepoOwner',
  GITHUB_REPO: 'githubRepo',
  GITHUB_BRANCH: 'githubBranch',
  GITHUB_CONNECTION_ARN: 'githubConnectionArn'
} as const
export type Context = (typeof Context)[keyof typeof Context];
