#!/bin/bash
mkdir -p ./web/config
ddev drush config:export --destination=/var/www/html/web/config
