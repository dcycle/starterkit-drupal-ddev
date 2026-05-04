#!/bin/bash
# Get a random password
PASSWORD=$(openssl rand -base64 12)
ddev drush upwd admin $PASSWORD
docker run --rm \
  -v "$(pwd)/test/playwright":/app/test \
  -e ADMIN_PASSWORD=$PASSWORD \
  --network ddev-starterkit-drupal-ddev_default \
  -w /app \
  --ipc=host \
  mcr.microsoft.com/playwright:v1.59.1-noble \
  bash -c "npm init -y && npm install @playwright/test && npx playwright test test"
