import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { MainStack } from '@stacks/main-stack'

test('Sample Test', () => {
  const app = new cdk.App()
  const stack = new MainStack(app, 'MyTestStack')
  const template = Template.fromStack(stack)
  expect(template).not.toBeNull()
})
