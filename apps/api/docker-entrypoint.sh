#!/bin/sh
set -e

if [ -z "${APP_KEY:-}" ]; then
    APP_KEY="$(php -r 'echo "base64:" . base64_encode(random_bytes(32));')"
    export APP_KEY
fi

exec "$@"
