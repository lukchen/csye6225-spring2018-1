read -p "Please enter the stack name you want to create: " stack

echo "Start to create Stack $stack ......"
aws cloudformation create-stack --stack-name $stack --template-body file://csye6225-cf-networking.json

status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus' --output text)

while [ $status != "CREATE_COMPLETE" ]
	do 
	echo "Creating Stack $stack, current status is $status ......"
	sleep 10
	status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus[]' --output text)
	done

echo "------Stack $stack is created!------"

