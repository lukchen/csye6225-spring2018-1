echo "Below is the stacks you have:"
aws cloudformation describe-stacks
read -p "Please enter the Stack name you want to delete: " stack

echo "Start to change instance termination in Stack $stack ...... "
EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=MyTag" --query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
aws ec2 modify-instance-attribute --instance-id $EC2_ID --no-disable-api-termination 

aws cloudformation delete-stack  --stack-name $stack  

status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus' --output text)

while [ $status != "DELETE_COMPLETE" ]
	do 
	echo "Deleting Stack $stack, current status is $status ......"
	sleep 10
	status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus[]' --output text)
	done

echo "------Stack $stack is deleted !------"

aws ec2 delete-tags --resources $EC2_ID --tags Key=Name,Value=MyTag