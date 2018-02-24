aws cloudformation create-stack \
--stack-name rolestack \
--template-body file://csye6225-cf-ci-cd.json \
--parameters ParameterKey=STACKNAME,ParameterValue="STACK_NAME" \
--capabilities CAPABILITY_NAMED_IAM
