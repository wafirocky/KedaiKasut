#!/bin/sh
set -e

# APP_KEY must come from the panel's environment; generate a throwaway one only
# so the mockup still boots if it is missing.
if [ -z "$APP_KEY" ]; then
    echo "warning: APP_KEY not set, generating an ephemeral key"
    export APP_KEY="base64:$(head -c 32 /dev/urandom | base64)"
fi

touch /app/database/database.sqlite
chown www-data:www-data /app/database/database.sqlite

php artisan migrate --force --no-interaction
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
