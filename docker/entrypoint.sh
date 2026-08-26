#!/bin/sh
set -e

# APP_KEY must come from the panel's environment; generate a throwaway one only
# so the mockup still boots if it is missing. Sessions/cookies are invalidated
# on every restart when that happens, so always set it in EasyPanel.
if [ -z "$APP_KEY" ]; then
    echo "warning: APP_KEY not set, generating an ephemeral key"
    export APP_KEY="base64:$(head -c 32 /dev/urandom | base64)"
fi

if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    DB_FILE="${DB_DATABASE:-/data/database.sqlite}"
    mkdir -p "$(dirname "$DB_FILE")"
    touch "$DB_FILE"
    chown www-data:www-data "$DB_FILE"
else
    # A networked database usually starts accepting connections a few seconds
    # after this container does, so block instead of crash-looping on migrate.
    echo "waiting for ${DB_CONNECTION} at ${DB_HOST:-?}:${DB_PORT:-?}..."
    attempt=0
    until php artisan db:show >/dev/null 2>&1; do
        attempt=$((attempt + 1))
        if [ "$attempt" -ge 60 ]; then
            echo "error: database unreachable after 120s, giving up" >&2
            php artisan db:show || true
            exit 1
        fi
        sleep 2
    done
    echo "database is up"
fi

php artisan migrate --force --no-interaction
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
