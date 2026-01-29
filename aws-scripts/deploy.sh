#!/bin/bash
set -e

KEY_NAME="fixitnow-key"
SECURITY_GROUP_NAME="fixitnow-sg"
INSTANCE_TYPE="t2.medium"
AMI_ID="ami-0705384c0b33c194c"
REGION="eu-north-1"

echo "=== Deploying FixItNow to AWS ==="

aws ec2 create-key-pair --key-name $KEY_NAME --region $REGION --query 'KeyMaterial' --output text > ~/.ssh/$KEY_NAME.pem 2>/dev/null || echo "Key exists"
chmod 400 ~/.ssh/$KEY_NAME.pem 2>/dev/null || true

SG_ID=$(aws ec2 create-security-group --group-name $SECURITY_GROUP_NAME --description "FixItNow security group" --region $REGION --query 'GroupId' --output text 2>/dev/null || aws ec2 describe-security-groups --filters "Name=group-name,Values=$SECURITY_GROUP_NAME" --region $REGION --query 'SecurityGroups[0].GroupId' --output text)

aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0 --region $REGION 2>/dev/null || true
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 3000 --cidr 0.0.0.0/0 --region $REGION 2>/dev/null || true
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 8090 --cidr 0.0.0.0/0 --region $REGION 2>/dev/null || true

INSTANCE_ID=$(aws ec2 run-instances \
    --image-id $AMI_ID \
    --instance-type $INSTANCE_TYPE \
    --key-name $KEY_NAME \
    --security-group-ids $SG_ID \
    --region $REGION \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=FixItNow-Server}]" \
    --user-data file://user-data.sh \
    --query 'Instances[0].InstanceId' \
    --output text)

echo "Instance launched: $INSTANCE_ID"
echo "Waiting for public IP..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID --region $REGION

PUBLIC_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --region $REGION --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

echo "=== Deployment Complete ==="
echo "Public IP: $PUBLIC_IP"
echo "Frontend: http://$PUBLIC_IP:3000"
echo "Backend: http://$PUBLIC_IP:8090/api"
