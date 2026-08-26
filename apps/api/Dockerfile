FROM php:8.2-cli

# Install system packages and PHP extensions required by Laravel/MySQL
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        intl \
        zip \
    && rm -rf /var/lib/apt/lists/*

# Copy Composer from the official Composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy dependency files first for better Docker layer caching
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install \
    --no-interaction \
    --prefer-dist \
    --no-scripts

# Copy the Laravel application
COPY . .

# Generate optimized Composer autoload files
RUN composer dump-autoload --optimize

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]