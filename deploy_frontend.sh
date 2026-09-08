#!/bin/bash
set -e

# Build the Next.js application
echo "Building Next.js application..."
npm ci
npm run build

# Extract the S3 bucket name from Terraform outputs
cd ../infrastructure
S3_BUCKET=$(terraform output -raw frontend_bucket 2>/dev/null || echo "dev-lms-frontend-406579089446")
CLOUDFRONT_DOMAIN=$(terraform output -raw frontend_domain 2>/dev/null || echo "")

cd ../frontend

echo "Deploying to S3 bucket: $S3_BUCKET"
aws s3 sync out/ s3://$S3_BUCKET --delete

echo "Frontend deployed successfully!"
if [ -n "$CLOUDFRONT_DOMAIN" ]; then
  echo "Access it at: https://$CLOUDFRONT_DOMAIN"
fi
