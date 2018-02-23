#!/bin/bash
echo "Below is the stacks you have:"
aws cloudformation describe-stacks
read -p "Please enter the Stack name you want to delete: " stack

echo "Start to change instance termination in Stack $stack... "
EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:aws:cloudformation:stack-name,Values=$stack" --query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
aws ec2 modify-instance-attribute --instance-id $EC2_ID --no-disable-api-termination 

echo "Start to delete Stack $stack..."
aws cloudformation delete-stack  --stack-name $stack  
echo "Stack $stack is deleted."
