#!/bin/bash
rm -rf ./starter-data
mkdir -p ./starter-data
ddev drush sql:dump \
  --skip-tables-list=cache,cache_*,watchdog,search_index \
  --structure-tables-list=cache,cache_*,watchdog,search_index \
  >> ./starter-data/initial.sql
docker cp ddev-starterkit-drupal-ddev-web:/var/www/html/web/sites/default/files ./starter-data/files
# Get rid of stuff we don't want in our starter data
rm -rf ./starter-data/files/.htaccess
rm -rf ./starter-data/files/css
rm -rf ./starter-data/files/js
rm -rf ./starter-data/files/php
rm -rf ./starter-data/files/styles
rm -rf ./starter-data/files/sync
