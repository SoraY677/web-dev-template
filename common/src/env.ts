export const getEnv = () => {
  const DOMAIN_HEAD = process.env.DOMAIN_HEAD ?? ''
  const DOMAIN_BASE = process.env.DOMAIN_BASE ?? ''
  return {
    DOMAIN_HEAD,
    DOMAIN_BASE,
    DOMAIN: [DOMAIN_HEAD, DOMAIN_BASE].join('.'),
    INFRA_GITHUB_REPO_OWNER: process.env.INFRA_GITHUB_REPO_OWNER ?? '',
    INFRA_GITHUB_REPO_NAME: process.env.INFRA_GITHUB_REPO_OWNER ?? '',
    INFRA_GITHUB_REPO_BRANCH:process.env.INFRA_GITHUB_REPO_OWNER ?? '',
    INFRA_GITHUB_CONNECTION_ARN: process.env.INFRA_GITHUB_REPO_OWNER ?? ''
  }
}
