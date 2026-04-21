#!/bin/bash
ddev start
ddev composer install
ddev drush site:install -y
ddev describe
