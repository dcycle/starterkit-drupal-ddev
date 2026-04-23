#!/bin/bash
# Get a random password
PASSWORD=$(openssl rand -base64 12)
ddev drush upwd admin $PASSWORD
# https://github.com/Lullabot/ddev-playwright/issues/77
ddev exec -s web /bin/bash -c "export ADMIN_PASSWORD=$PASSWORD && cd test/playwright && yarn && yarn playwright test"
