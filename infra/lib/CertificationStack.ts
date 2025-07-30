import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import {  getEnv } from '../../common/src/env';



export class CertificateStack extends Stack {
  private readonly _certificateArn: string;
  private env: ReturnType<typeof getEnv>;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, { ...props, env: { ...props?.env, region: 'us-east-1' } });
    this.env = getEnv()

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', { 
      domainName: this.env.DOMAIN_BASE
    });

    const certificate = new certificatemanager.Certificate(this, 'SiteCertificate', {
      domainName: this.env.DOMAIN,
      validation: certificatemanager.CertificateValidation.fromDns(hostedZone),
    });

    this._certificateArn = certificate.certificateArn;
  }

  get certificateArn() { return this._certificateArn }
}
