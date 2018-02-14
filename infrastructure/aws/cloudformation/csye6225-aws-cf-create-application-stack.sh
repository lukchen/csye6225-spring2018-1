aws cloudformation create-stack \
--stack-name assignment4stack \
--template-body file://csye6225-cf-application.json \
--parameters ParameterKey=STACKNAME,ParameterValue="STACK_NAME" \
ParameterKey=InstanceType,ParameterValue=t2.micro \
ParameterKey=ImageId,ParameterValue=ami-66506c1c \
ParameterKey=Size,ParameterValue=16 \
ParameterKey=VolumeType,ParameterValue=gp2 
