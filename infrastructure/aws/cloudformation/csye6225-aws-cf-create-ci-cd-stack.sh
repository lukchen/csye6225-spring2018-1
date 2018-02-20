aws cloudformation create-stack \
--stack-name rolestack \
--template-body file://csye6225-cf-ci-cd.json \
--parameters ParameterKey=STACKNAME,ParameterValue="STACK_NAME" \
--capabilities CAPABILITY_NAMED_IAM

EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=MyTag" \
--query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
echo $EC2_ID

sleep 30s

ProfileName=$(aws iam list-instance-profiles-for-role --role-name ec2Role \
--query 'InstanceProfiles[*].InstanceProfileName' --output text)
echo $ProfileName

aws ec2 associate-iam-instance-profile --instance-id $EC2_ID \
--iam-instance-profile Name=$ProfileName
aws ec2 describe-iam-instance-profile-associations

