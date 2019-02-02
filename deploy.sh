#!/usr/bin/env bash
yarn build
aws --profile app s3 sync ./build/ s3://opensongbook.laurell.org
aws --profile app cloudfront create-invalidation --distribution-id E37KF3YUBDHKK6 --paths "/*"