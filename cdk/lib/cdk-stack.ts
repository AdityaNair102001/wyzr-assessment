import { Stack, StackProps, aws_s3 as s3, SecretValue } from "aws-cdk-lib";
import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront";
import { BuildSpec, Project } from "aws-cdk-lib/aws-codebuild";
import { Artifact, Pipeline } from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
  GitHubSourceAction,
  GitHubTrigger,
} from "aws-cdk-lib/aws-codepipeline-actions";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const bucket = new Bucket(this, "CdkTestBucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
    });

    new BucketDeployment(this, "DeployCRA", {
      sources: [Source.asset("../build")],
      destinationBucket: bucket,
    });

    new CloudFrontWebDistribution(this, "CDKWyzrDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    // new CodePipeline(this, "Pipeline", {
    //   pipelineName: "wyzrcdkpipeline",
    //   synth: new ShellStep("synth", {
    //     input: CodePipelineSource.gitHub(
    //       "AdityaNair102001/wyzr-assessment",
    //       "main"
    //     ),
    //     commands: ["npm ci", "npm run build", "npx cdk synth"],
    //   }),
    // });

    const pipeline = new Pipeline(this, "FrontendPipeline", {
      pipelineName: "deploy-angular-application",
    });

    // add Stages

    const sourceStage = pipeline.addStage({
      stageName: "Source",
    });

    const buildStage = pipeline.addStage({
      stageName: "Build",
      placement: {
        justAfter: sourceStage,
      },
    });

    const sourceOutput = new Artifact();
    const sourceAction = new GitHubSourceAction({
      actionName: "GitHub",
      owner: "AdityaNair102001",
      repo: "wyzr-assessment",
      oauthToken: SecretValue.secretsManager(
        "arn:aws:secretsmanager:ap-south-1:014651819218:secret:github-token-VajTwj"
      ),
      output: sourceOutput,
      branch: "main",
      trigger: GitHubTrigger.POLL, // default: 'WEBHOOK', 'NONE' is also possible for no Source trigger
    });

    sourceStage.addAction(sourceAction);

    const role = new Role(this, "CodeBuildRole", {
      assumedBy: new ServicePrincipal("codebuild.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"),
        ManagedPolicy.fromAwsManagedPolicyName("CloudFrontFullAccess"),
      ],
    });

    const codebuild = new Project(this, "WyzrCodeBuild", {
      role,
      buildSpec: BuildSpec.fromSourceFilename("buildspec.yml"),
    });

    const buildAction = new CodeBuildAction({
      actionName: "Build",
      input: sourceOutput,
      project: codebuild,
    });

    buildStage.addAction(buildAction);
  }
}
