import path from 'path'

import * as cdk from 'aws-cdk-lib'
import dotenv from 'dotenv'

import { getEnv } from '../../common/src/env'
import { CertificateStack } from '../lib/CertificationStack'
import { MainStack } from '../lib/MainStack'

const app = new cdk.App()
const env = app.node.tryGetContext('env')
dotenv.config({ path: path.join(__dirname, `../../.env.${env}`), override: true })

const stackName = getEnv().DOMAIN.replace(/\./g, '-')

const certificateStack = new CertificateStack(app, `${stackName}-certification`, {
  env: {
    account: process.env.INFRA_AWS_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
  crossRegionReferences: true,
})

new MainStack(app, stackName, {
  env: {
    account: process.env.INFRA_AWS_DEFAULT_ACCOUNT,
    region: process.env.INFRA_AWS_DEFAULT_REGION,
  },
  crossRegionReferences: true,
  certificateArn: certificateStack.certificateArn,
})
