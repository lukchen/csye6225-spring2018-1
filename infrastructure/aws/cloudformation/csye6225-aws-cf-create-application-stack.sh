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

echo "Stack $stack is created."
