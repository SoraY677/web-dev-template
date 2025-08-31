import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'

import * as envModule from '../../common/src/env'
import { MainStack } from '../lib/MainStack'

describe('MainStack', () => {
  it('synthesizes without error', () => {
    jest.spyOn(envModule, 'getEnv').mockReturnValue({
      DOMAIN: 'dummy.local',
      DOMAIN_BASE: 'dummy.local',
      INFRA_GITHUB_REPO_OWNER: 'dummy',
      INFRA_GITHUB_REPO_NAME: 'dummy',
      INFRA_GITHUB_REPO_BRANCH: 'main',
      INFRA_GITHUB_CONNECTION_ARN: 'arn:aws:codestar-connections:ap-northeast-1:123456789012:connection/dummy',
    } as ReturnType<typeof envModule.getEnv>)

    const app = new cdk.App()
    const stack = new MainStack(app, 'MyTestStack', {
      certificateArn: 'arn:aws:acm:us-east-1:123456789012:certificate/dummy',
      env: { account: '123456789012', region: 'ap-northeast-1' },
    })
    stack['env'] = { ...stack['env'] }
    const template = Template.fromStack(stack)
    expect(template).not.toBeNull()
  })
})
