import {
  EC2Client,
  DescribeRegionsCommand,
  EC2ClientConfig,
  DescribeRegionsCommandInput,
} from '@aws-sdk/client-ec2';
import { AwsCredentialIdentity, Provider } from '@aws-sdk/types';
import { fromSSO } from '@aws-sdk/credential-provider-sso';
const handler = async (
  credential?: AwsCredentialIdentity | Provider<AwsCredentialIdentity>,
) => {
  const ec2clientConfig: EC2ClientConfig = {
    region: 'ap-northeast-1',
    credentials: credential,
  };
  const client = new EC2Client(ec2clientConfig);
  const input: DescribeRegionsCommandInput = {};
  const command = new DescribeRegionsCommand(input);
  const { Regions } = await client.send(command);
  console.log(Regions);
};
// requires `aws sso configure` to be done.
const getCredentialFromConfig = async (profileName = 'my-profile') =>
  fromSSO({ profile: profileName });
await handler(await getCredentialFromConfig());
