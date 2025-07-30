import * as cdk from 'aws-cdk-lib'
import dotenv from 'dotenv';
import { MainStack } from '../lib/MainStack'
import { CertificateStack } from '../lib/CertificationStack'
import { getEnv } from '../../common/src/env';
import path from 'path';

const app = new cdk.App()
const env = app.node.tryGetContext('env')
dotenv.config({ path: path.join(__dirname,`../../.env.${env}`) });

const stackName = getEnv().DOMAIN.replace(/\./g, '-')

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
