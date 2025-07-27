import * as cdk from 'aws-cdk-lib'
import { MainStack } from '../lib/main-stack'
import { CertificateStack } from '../lib/certification-stack'
import { DOMAIN } from '../../common/src/env'

const app = new cdk.App()

const stackName = DOMAIN.replace(/\./g, '-')
if (!stackName) process.exit(1)

const certificateStack = new CertificateStack(app, `${stackName}-certification`, {
  env: {
    account: process.env.INFRA_AWS_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
  crossRegionReferences: true
})

new MainStack(app, stackName, {
  env: {
    account: process.env.INFRA_AWS_DEFAULT_ACCOUNT,
    region: process.env.INFRA_AWS_DEFAULT_REGION,
  },
  crossRegionReferences: true,
  certificateArn: certificateStack.certificateArn
})
