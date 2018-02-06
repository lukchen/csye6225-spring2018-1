#author: chen.zena@husky.neu.edu
aws ec2 create-key-pair --key-name STACK_NAME
aws cloudformation create-stack --stack-name STACK_NAME-csye6225-vpc --template-body file://csye6225-cf-networking.json