#!/bin/bash
ddev start
ddev composer install
ddev drush site:install minimal -y
ddev drush sqlc < ./starter-data/initial.sql
ddev describe
