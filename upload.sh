#!/usr/bin/env bash
#yarn build
sls syncToS3
aws --profile app cloudfront create-invalidation --distribution-id E3SX3YRVLR1RCI --paths "/*"