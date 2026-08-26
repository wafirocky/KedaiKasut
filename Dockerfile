# Production image for the KedaiKasut mockup.
# Single SQLite-backed container — no external database service required.

# ---------- build ----------
FROM php:8.4-cli-alpine AS build

# Wayfinder shells out to `php artisan` during the Vite build, so this stage
# needs PHP *and* Node together.
RUN apk add --no-cache git unzip nodejs npm oniguruma-dev sqlite-dev \
    && docker-php-ext-install mbstring pdo_sqlite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-progress

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

RUN composer dump-autoload --optimize --classmap-authoritative --no-dev \
    && php artisan package:discover --ansi \
    && npm run build \
    && rm -rf node_modules

# ---------- runtime ----------
FROM php:8.4-cli-alpine AS runtime

# The -dev packages are only needed to compile the extensions; drop them again
# so the runtime layer stays small.
RUN apk add --no-cache oniguruma sqlite-libs \
    && apk add --no-cache --virtual .build-deps oniguruma-dev sqlite-dev \
    && docker-php-ext-install mbstring pdo_sqlite opcache \
    && apk del .build-deps

COPY docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

WORKDIR /app

COPY --from=build /app /app
COPY docker/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint \
    && mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs /data \
    && chown -R www-data:www-data storage bootstrap/cache /data

ENV APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr \
    DB_CONNECTION=sqlite \
    DB_DATABASE=/data/database.sqlite

# Mount a persistent volume here so the SQLite file survives redeploys.
VOLUME ["/data"]

EXPOSE 8000

ENTRYPOINT ["entrypoint"]
