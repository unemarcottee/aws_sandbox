require 'aws-sdk-ec2'

region = 'ap-northeast-1'
# https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/SSOCredentials.html
# Aws::SSOCredentials に profile を指定する方法はなさそう
# ↓のとおり profile を指定して login しておかなければならないっぽい。
# You must first run aws sso login --profile your-sso-profile
sso_credentials = Aws::SSOCredentials.new(
  sso_account_id: '123456789',
  sso_role_name: "role_name",
  sso_region: region,
  sso_start_url:'my-url',
  sso_session: 'my-session'
)

ec2_client = Aws::EC2::Client.new(region: region, credentials: sso_credentials)
r = ec2_client.describe_regions

p r