read -p "Please enter the stack name you want to create: " stack

publicSubnetId=$(aws ec2 describe-subnets --filter "Name=tag:Name,Values=public" --query 'Subnets[*].SubnetId' --output text)
privateSubnetId1=$(aws ec2 describe-subnets --filter "Name=tag:Name,Values=private1" --query 'Subnets[*].SubnetId' --output text)
privateSubnetId2=$(aws ec2 describe-subnets --filter "Name=tag:Name,Values=private2" --query 'Subnets[*].SubnetId' --output text)
ec2SGId=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=csye6225-webapp" --query 'SecurityGroups[*].GroupId' --output text)
RDSSG=$(aws ec2 describe-security-groups --filter "Name=group-name,Values=csye6225-rds" --query 'SecurityGroups[*].GroupId' --output text)
VpcId=$(aws ec2 describe-vpcs --filter "Name=tag:Name,Values=STACK_NAME-csye6225-vpc" --query 'Vpcs[*].VpcId' --output text)
Lambdaarn=$(aws lambda get-function --function-name lambdatest --query 'Configuration.FunctionArn' --output text)
echo "Start to create Stack $stack ......"
aws cloudformation create-stack --stack-name $stack \
--capabilities CAPABILITY_NAMED_IAM \
--template-body file://csye6225-cf-application.json --region us-east-1 \
--parameters ParameterKey=STACKNAME,ParameterValue=$stack \
ParameterKey=InstanceType,ParameterValue=t2.micro \
ParameterKey=ImageId,ParameterValue=ami-66506c1c \
ParameterKey=Size,ParameterValue=16 \
ParameterKey=VolumeType,ParameterValue=gp2 \
ParameterKey=PublicSubnetId,ParameterValue=$publicSubnetId \
ParameterKey=csye6225vpc,ParameterValue=$VpcId \
ParameterKey=ec2SG,ParameterValue=$ec2SGId \
ParameterKey=RDSSG,ParameterValue=$RDSSG \
ParameterKey=PrivateSubnetId1,ParameterValue=$privateSubnetId1 \
ParameterKey=PrivateSubnetId2,ParameterValue=$privateSubnetId2 \
ParameterKey=lambdaarn,ParameterValue=$Lambdaarn

sleep 60
EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=MyTag" --query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
# echo $EC2_ID

ProfileName=$(aws iam list-instance-profiles-for-role --role-name CodeDeployEC2ServiceRole \
--query 'InstanceProfiles[*].InstanceProfileName' --output text)
# echo $ProfileName

aws ec2 associate-iam-instance-profile --instance-id $EC2_ID --iam-instance-profile Name=$ProfileName

# aws ec2 describe-iam-instance-profile-associations

aws ssm put-parameter --name "configfile" --type "String" --value file://myconfig.json

status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus' --output text)

while [ $status != "CREATE_COMPLETE" ]
	do 
	echo "Stack $stack is creating, current status is $status ......"
	sleep 30
	status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus[]' --output text)
	done
	
echo "------Stack $stack is created!------"
