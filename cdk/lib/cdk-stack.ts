import * as cdk from "aws-cdk-lib";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "path";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new cdk.aws_lambda_nodejs.NodejsFunction(this, "lambda", {
      entry: "../src/index.tsx",
      handler: "handler",
      timeout: cdk.Duration.minutes(10),
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      bundling: {
        format: cdk.aws_lambda_nodejs.OutputFormat.ESM,
        commandHooks: {
          afterBundling: (inputDir: string, outputDir: string): string[] => [
            `cp -r ${join(inputDir, "..", "assets")} ${outputDir}`,
          ],
          beforeBundling: () => [],
          beforeInstall: () => [],
        },
      },
    });

    const functionUrl = fn.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });
    new cdk.CfnOutput(this, "lambdaFunctionUrl", {
      value: functionUrl.url!,
    });
    const api = new cdk.aws_apigatewayv2.HttpApi(this, "HttpProxyApi", {
      defaultIntegration:
        new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
          "Integration",
          fn,
          {
            timeout: cdk.Duration.seconds(29),
          }
        ),
    });
    new cdk.CfnOutput(this, "apiGatewayV2Url", {
      value: api.url!,
    });
  }
}
