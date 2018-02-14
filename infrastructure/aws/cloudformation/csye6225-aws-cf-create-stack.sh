#author: chen.zena@husky.neu.edu
aws cloudformation create-stack --stack-name assignment4stack --template-body file://csye6225-cf-application.json --parameters ParameterKey=STACKNAME,ParameterValue="STACK_NAME"
