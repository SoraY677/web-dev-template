import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Infra from '@stacks/main-stack';

test('Sample Test', () => {
  const app = new cdk.App();
  const stack = new Infra.InfraStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);
});
