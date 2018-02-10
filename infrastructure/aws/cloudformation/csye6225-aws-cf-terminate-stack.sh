#!/bin/bash
#author: chen.zena@husky.neu.edu
echo "Please enter the Stack Name you want to delete:"
# "read" will wait for the user input and put in the variable you assign
read STACK_NAME
EC2_ID=$(aws ec2 describe-instances --filter "Name=EC2" --query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
aws ec2 modify-instance-attribute --instance-id $EC2_ID --no-disable-api-termination 
aws cloudformation delete-stack  --stack-name startmyinstance  
