echo "Below is the Stack list: "
aws cloudformation describe-stacks

read -p "Please enter the Stack name you want to delete: " stack

echo "Now clear the stack bucket ......"

aws s3 rm s3://code-deploy.csye6225-spring2018-jiaxi.me --recursive


ProfileName=$(aws iam list-instance-profiles-for-role --role-name CodeDeployEC2ServiceRole --query 'InstanceProfiles[*].InstanceProfileName' --output text)

echo $ProfileName

AssociationId=$(aws ec2 describe-iam-instance-profile-associations --query 'IamInstanceProfileAssociations[*].AssociationId' --output text)
echo $AssociationId

aws ec2 disassociate-iam-instance-profile --association-id $AssociationId

aws iam remove-role-from-instance-profile --instance-profile-name $ProfileName --role-name CodeDeployEC2ServiceRole
aws iam delete-instance-profile --instance-profile-name $ProfileName
aws iam delete-role-policy --role-name CodeDeployEC2ServiceRole --policy-name CodeDeployEC2S3
aws iam delete-role --role-name CodeDeployEC2ServiceRole
aws cloudformation delete-stack  --stack-name $stack

status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus' --output text)

while [ $status != "DELETE_COMPLETE" ]
	do 
	echo "Deleting Stack $stack, current status is $status ......"
	sleep 20
	status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus[]' --output text)
	done
echo "Stack $stack is deleted"

