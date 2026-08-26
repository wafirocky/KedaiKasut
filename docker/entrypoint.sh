#!/bin/sh
set -e

# APP_KEY must come from the panel's environment; generate a throwaway one only
# so the mockup still boots if it is missing. Sessions/cookies are invalidated
# on every restart when that happens, so always set it in EasyPanel.
if [ -z "$APP_KEY" ]; then
    echo "warning: APP_KEY not set, generating an ephemeral key"
    export APP_KEY="base64:$(head -c 32 /dev/urandom | base64)"
fi

DB_FILE="${DB_DATABASE:-/data/database.sqlite}"
mkdir -p "$(dirname "$DB_FILE")"
touch "$DB_FILE"
chown www-data:www-data "$DB_FILE"

php artisan migrate --force --no-interaction
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
