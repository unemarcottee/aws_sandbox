import boto3
# python3 -m pip install boto3

# requires `aws sso configure` to be done.
boto3.setup_default_session(profile_name='my-profile')

client = boto3.client('ec2')
res = client.describe_regions()
print(res)
