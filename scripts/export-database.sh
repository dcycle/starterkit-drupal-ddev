#!/bin/bash
ddev drush sql:dump --ordered-dump \
  --skip-tables-list=cache,cache_* > \
  ./do-not-commit/dumpfile.sql
ddev drush sql:dump --ordered-dump \
  --structure-tables-list=cache,cache_* >> \
  ./do-not-commit/dumpfile.sql
