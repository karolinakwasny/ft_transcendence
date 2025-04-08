#!/bin/sh

set -x 

# SSL="/etc/nginx/certs"
HOSTNAME="nginx-jm1p.onrender.com"

createDir() {
    mkdir -p "$1"
}

configure_nginx() {
    echo "🔄 Replacing environment variables in NGINX configuration..."
    envsubst '$NGINX_SERVER_NAME' < /etc/nginx/nginx.template > /tmp/nginx.conf
    echo "✅ NGINX configuration updated."

    # Start NGINX with the new configuration
    echo "🚀 Starting NGINX..."
    nginx -c /tmp/nginx.conf -g "daemon off;"
}

# Run all functions
# generate_certificates
# create_env
# copy_env
configure_nginx

echo "✅ Render process completed successfully!"
