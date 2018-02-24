EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=MyTag" \
--query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
echo $EC2_ID

ProfileName=$(aws iam list-instance-profiles-for-role --role-name CodeDeployEC2ServiceRole \
--query 'InstanceProfiles[*].InstanceProfileName' --output text)
echo $ProfileName

AssociationId=$(aws ec2 describe-iam-instance-profile-associations \
--query 'IamInstanceProfileAssociations[*].AssociationId' --output text)
echo $AssociationId

aws ec2 disassociate-iam-instance-profile --association-id $AssociationId

aws iam remove-role-from-instance-profile --instance-profile-name $ProfileName --role-name CodeDeployEC2ServiceRole
aws iam delete-instance-profile --instance-profile-name $ProfileName
aws iam delete-role-policy --role-name CodeDeployEC2ServiceRole --policy-name CodeDeployEC2S3
aws iam delete-role --role-name CodeDeployEC2ServiceRole
aws cloudformation delete-stack  --stack-name rolestack 