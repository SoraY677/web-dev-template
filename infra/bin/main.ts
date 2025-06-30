import * as cdk from 'aws-cdk-lib'
import { MainStack } from '@stacks/main-stack'

const app = new cdk.App()

const stackName = process.env.INFRA_AWS_STACK_NAME
if (!stackName) process.exit(1)

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
new MainStack(app, stackName, {
  env: {
    account: process.env.INFRA_AWS_DEFAULT_ACCOUNT,
    region: process.env.INFRA_AWS_DEFAULT_REGION,
  },
})
