EC2_ID=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=MyTag" \
--query 'Reservations[*].Instances[*].{id:InstanceId}' --output text)
echo $EC2_ID

ProfileName=$(aws iam list-instance-profiles-for-role --role-name ec2Role \
--query 'InstanceProfiles[*].InstanceProfileName' --output text)
echo $ProfileName

AssociationId=$(aws ec2 describe-iam-instance-profile-associations \
--query 'IamInstanceProfileAssociations[*].AssociationId' --output text)
aws ec2 disassociate-iam-instance-profile --association-id $AssociationId

aws iam remove-role-from-instance-profile --instance-profile-name $ProfileName --role-name ec2Role
aws iam delete-instance-profile --instance-profile-name $ProfileName
aws iam delete-role-policy --role-name ec2Role --policy-name ec2policy
aws iam delete-role --role-name ec2Role
aws cloudformation delete-stack  --stack-name rolestack  