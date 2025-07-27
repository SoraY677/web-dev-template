import * as cdk from 'aws-cdk-lib';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { DOMAIN, DOMAIN_BASE } from '../../common/src/env';

export class CertificateStack extends cdk.Stack {
  public readonly certificateArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, env: { ...props?.env, region: 'us-east-1' } });

    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', { domainName: DOMAIN_BASE });

    const certificate = new certificatemanager.Certificate(this, 'SiteCertificate', {
      domainName: DOMAIN,
      validation: certificatemanager.CertificateValidation.fromDns(hostedZone),
    });

    this.certificateArn = certificate.certificateArn;
  }
}
