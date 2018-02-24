read -p "Please enter the stack name you want to create: " stack

echo "Start to create Stack $stack ..."
aws cloudformation create-stack \
--stack-name $stack \
--template-body file://csye6225-cf-application.json \
--region us-east-1 \
--parameters ParameterKey=STACKNAME,ParameterValue="STACK_NAME" \
ParameterKey=InstanceType,ParameterValue=t2.micro \
ParameterKey=ImageId,ParameterValue=ami-66506c1c \
ParameterKey=Size,ParameterValue=16 \
ParameterKey=VolumeType,ParameterValue=gp2 


sleep 30s

EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=MyTag" \
--query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
echo $EC2_ID

ProfileName=$(aws iam list-instance-profiles-for-role --role-name CodeDeployEC2ServiceRole \
--query 'InstanceProfiles[*].InstanceProfileName' --output text)
echo $ProfileName

aws ec2 associate-iam-instance-profile --instance-id $EC2_ID \
--iam-instance-profile Name=$ProfileName
aws ec2 describe-iam-instance-profile-associations

