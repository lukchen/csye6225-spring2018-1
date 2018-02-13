#!/bin/bash
#author: chen.zena@husky.neu.edu
EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=MyTag" --query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
aws ec2 modify-instance-attribute --instance-id $EC2_ID --no-disable-api-termination 
aws cloudformation delete-stack  --stack-name assignment4stack  