import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53_targets from 'aws-cdk-lib/aws-route53-targets';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs'
import { DOMAIN, DOMAIN_BASE } from '../../common/src/env';

export interface MainStackProps extends cdk.StackProps {
  certificateArn: string;
}

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MainStackProps) {
    super(scope, id, props)
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: DOMAIN_BASE,
    });

    const acm = this.getAcmCertificate(props.certificateArn)
    const mainBucket = this.createS3MainBucket();
    const oac = this.createCloudFrontOac();
    const distribution = this.createCloudFrontDistribution(DOMAIN, mainBucket, oac, acm);
    this.createRoute53Record(DOMAIN, hostedZone, distribution);
  }

  // S3 MainBucket
  private createS3MainBucket = (): s3.Bucket => {
    return new s3.Bucket(this, 'MainBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
    });
  }

  // CloudFront
  private createCloudFrontOac = (): cloudfront.CfnOriginAccessControl => {
    /**
     * @type {cloudfront.CfnOriginAccessControl}
     */
    return new cloudfront.CfnOriginAccessControl(this, `${this.stackName}-CloudFrontOAC`, {
      originAccessControlConfig: {
        name: `${this.stackName}-oac`,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4',
        description: 'OAC for S3 bucket access',
      },
    });
  }
  private createCloudFrontFunction = (): cloudfront.Function => {
    /**
     * @type {cloudfront.Function}
     */
    return new cloudfront.Function(this, `${this.stackName}-SpaIndexFunction`, {
      code: cloudfront.FunctionCode.fromInline(`
        function handler(event) {
            var request = event.request;
            var uri = request.uri;
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
            return request;
        }
      `),
    });
  }
  private createCloudFrontDistribution = (
    domainName: string,
    mainBucket: s3.Bucket,
    oac: cloudfront.CfnOriginAccessControl,
    acm: certificatemanager.ICertificate
  ): cloudfront.Distribution => {
    const spaIndexFunction = this.createCloudFrontFunction();
    const distribution = new cloudfront.Distribution(this, `${this.stackName}-CloudFrontDistribution`, {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(mainBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        functionAssociations: [
          {
            function: spaIndexFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      domainNames: [domainName],
      certificate: acm,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      enableIpv6: false,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.seconds(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.seconds(5),
        },
      ],
    });
    const cfnDistribution = distribution.node.defaultChild as cloudfront.CfnDistribution;
    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      oac.attrId
    );
    return distribution;
  }

  // ACM
  private getAcmCertificate = (certificateArn: string): certificatemanager.ICertificate => {
    const acm = certificatemanager.Certificate.fromCertificateArn(this, 'ImportedCertificate', certificateArn);
    return acm
  }

  // Route53
  private createRoute53Record = (
    domainName: string,
    hostedZone: cdk.aws_route53.IHostedZone,
    distribution: cloudfront.Distribution
  ): void => {
    new route53.ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new route53_targets.CloudFrontTarget(distribution)
      ),
    })
  }
}
