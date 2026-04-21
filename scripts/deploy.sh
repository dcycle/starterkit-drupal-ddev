#!/bin/bash
ddev start
ddev composer install
ddev drush site:install minimal -y
ddev drush sqlc < ./starter-data/initial.sql
ddev drush config:import -y --source=/var/www/html/web/config
ddev describe
