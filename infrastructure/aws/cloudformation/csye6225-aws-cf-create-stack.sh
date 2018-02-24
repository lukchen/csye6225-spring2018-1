read -p "Please enter the stack name you want to create: " stack

echo "Start to create Stack $stack ..."
aws cloudformation create-stack --stack-name $stack \
--template-body file://csye6225-cf-networking.json

echo "Stack $stack is created."
