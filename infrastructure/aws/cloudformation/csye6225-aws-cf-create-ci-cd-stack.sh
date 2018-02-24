read -p "Please enter the CI/CD Stack name you want to create: " stack
aws cloudformation create-stack \
--stack-name $stack \
--template-body file://csye6225-cf-ci-cd.json \
--region us-east-1 \
--parameters ParameterKey=STACKNAME,ParameterValue="STACK_NAME" \
--capabilities CAPABILITY_NAMED_IAM

status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus' --output text)

while [ $status != "CREATE_COMPLETE" ]
	do 
	echo "Creating Stack $stack, current status is $status ......"
	sleep 30
	status=$(aws cloudformation describe-stacks --stack-name $stack --query 'Stacks[*].StackStatus[]' --output text)
	done

echo "------Stack $stack is created!------"
