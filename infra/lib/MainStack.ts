import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager'
import { Construct } from 'constructs'
import { aws_codebuild as awsCodeBuild, aws_codepipeline as awsCodepipeline, aws_codepipeline_actions as awsCodepipelineActions, aws_iam as awsIam, aws_route53 as awsRoute53, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import {getEnv } from '../../common/src/env'

export interface MainStackProps extends StackProps {
  certificateArn: string;
}

export class MainStack extends Stack {
  private env: ReturnType<typeof getEnv>
  constructor(scope: Construct, id: string, props: MainStackProps) {
    super(scope, id, props)
    this.env = getEnv()

    const domain = this.env.DOMAIN
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: this.env.DOMAIN_BASE,
    })

    const acm = this.getAcmCertificate(props.certificateArn)
    const mainBucket = this.createS3MainBucket()
    const oac = this.createCloudFrontOac()
    const distribution = this.createCloudFrontDistribution(domain, mainBucket, oac, acm)
    this.createRoute53Record(domain, hostedZone, distribution)
    this.createCodePipeline(domain, mainBucket)
  }

  // S3 MainBucket
  private createS3MainBucket = (): s3.Bucket => {
    return new s3.Bucket(this, 'MainBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
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
    })
  }

  // CloudFront
  private createCloudFrontOac = (): cloudfront.CfnOriginAccessControl => {
    return new cloudfront.CfnOriginAccessControl(this, `${this.stackName}-CloudFrontOAC`, {
      originAccessControlConfig: {
        name: `${this.stackName}-oac`,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4',
        description: 'OAC for S3 bucket access',
      },
    })
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
    })
  }
  private createCloudFrontDistribution = (
    domainName: string,
    mainBucket: s3.Bucket,
    oac: cloudfront.CfnOriginAccessControl,
    acm: certificatemanager.ICertificate,
  ): cloudfront.Distribution => {
    const spaIndexFunction = this.createCloudFrontFunction()
    const distribution = new cloudfront.Distribution(this, `${this.stackName}-CloudFrontDistribution`, {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: cloudfrontOrigins.S3BucketOrigin.withOriginAccessControl(mainBucket),
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
          ttl: Duration.seconds(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: Duration.seconds(5),
        },
      ],
    })
    const cfnDistribution = distribution.node.defaultChild as cloudfront.CfnDistribution
    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      oac.attrId,
    )
    return distribution
  }

  // ACM
  private getAcmCertificate = (certificateArn: string): certificatemanager.ICertificate => {
    const acm = certificatemanager.Certificate.fromCertificateArn(this, 'ImportedCertificate', certificateArn)
    return acm
  }

  // // Route53
  private createRoute53Record = (
    domainName: string,
    hostedZone: awsRoute53.IHostedZone,
    distribution: cloudfront.Distribution,
  ): void => {
    new route53.ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution),
      ),
    })
  }

  // // CodePipeline
  private createCodePipeline = (
    domainName: string,
    mainBucket: s3.Bucket,
  ) => {
    const sourceOutput = new awsCodepipeline.Artifact()
    const buildOutput = new awsCodepipeline.Artifact()
    const codeBuildProject = this.createCodeBuild(domainName)
    const artifactsS3Bucket = this.createArtifactsS3Bucket()

    return new awsCodepipeline.Pipeline(this, `${this.stackName}-CodePipeline`, {
      artifactBucket: artifactsS3Bucket,
      pipelineName: `${this.stackName}-Pipeline`,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new awsCodepipelineActions.CodeStarConnectionsSourceAction({
              actionName: 'GitHub_Source',
              owner: this.env.INFRA_GITHUB_REPO_OWNER,
              repo: this.env.INFRA_GITHUB_REPO_NAME,
              branch: this.env.INFRA_GITHUB_REPO_BRANCH,
              connectionArn: this.env.INFRA_GITHUB_CONNECTION_ARN,
              output: sourceOutput,
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new awsCodepipelineActions.CodeBuildAction({
              actionName: 'CodeBuild',
              project: codeBuildProject,
              input: sourceOutput,
              outputs: [buildOutput],
            }),
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new awsCodepipelineActions.S3DeployAction({
              actionName: 'S3_Deploy',
              bucket: mainBucket,
              input: buildOutput,
              extract: true,
            }),
          ],
        },
      ],
    })
  }
  private createArtifactsS3Bucket = () => {
    return new s3.Bucket(this, `${this.stackName}-ArtifactsBucket`, {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      lifecycleRules: [{ expiration: Duration.days(30) }],
      encryption: s3.BucketEncryption.S3_MANAGED,
    })
  }
  // Code Build
  private createCodeBuild = (
    domainName: string,
  ) => {
    const codeBuildIamRole = this.createCodeBuildIamRole()

    return new awsCodeBuild.PipelineProject(this, `${this.stackName}-CodeBuild`, {
      environment: {
        buildImage: awsCodeBuild.LinuxBuildImage.AMAZON_LINUX_2_ARM_3,
        computeType: awsCodeBuild.ComputeType.SMALL,
        privileged: false,
      },
      environmentVariables: {
        DOMAIN: { value: domainName },
        ENV_MODE: { value: 'production' },
      },
      buildSpec: awsCodeBuild.BuildSpec.fromSourceFilename('infra/buildspec.yml'),
      role: codeBuildIamRole,
    })
  }
  private createCodeBuildIamRole = () => {
    const codeBuildRole = new awsIam.Role(this, `${this.stackName}-CodeBuildRole`, {
      assumedBy: new awsIam.ServicePrincipal('codebuild.amazonaws.com'),
    })
    codeBuildRole.addManagedPolicy(awsIam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'))
    codeBuildRole.addManagedPolicy(awsIam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'))
    return codeBuildRole
  }
}
