import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as config from 'aws-cdk-lib/aws-config';

export class OrgConfigRulesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // organization level config rule for allowing specific ec2 instance types
    const configRules = new config.CfnOrganizationConfigRule(this, 'ConfigRules', {
      organizationConfigRuleName: 'EC2_INSTANCE_TYPE_CHECK',
      organizationCustomRuleMetadata: {
        description: 'Allows only specific EC2 instance types',
        inputParameters: "{allowedInstanceTypes: t3.micro,t3.small,t3.medium}",
        maximumExecutionFrequency: 'TwentyFour_Hours',
        resourceTypesScope: ['AWS::EC2::Instance'],
        tagKeyScope: 'aws-controltower',
        tagValueScope: 'enabled',
        organizationConfigRuleTriggerTypes: ['ConfigurationItemChangeNotification'],
        lambdaFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:EC2_INSTANCE_TYPE_CHECK',
      },
    });

  }
}
