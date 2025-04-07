#!/bin/sh

set -x 

SSL="./nginx/certs"
HOSTNAME="nginx-jm1p.onrender.com"

createDir() {
    mkdir -p "$1"
}

# Function to generate SSL certificates
generate_certificates() {
    echo "🔍 Decoding SSL certificates from environment variables..."

	mkdir -p "$SSL"

    # Decode the base64 encoded SSL certificates and save them to the right files
    echo "$SSL_CERT" | base64 -d > "$SSL/fullchain.crt"
    echo "$SSL_KEY" | base64 -d > "$SSL/privkey.key"

	

	ls -l "$SSL"  # List files to ensure certificates exist

    chmod 644 "$SSL/fullchain.crt" "$SSL/privkey.key"
	echo "🔑 SSL certificates generated and saved to $SSL."
    ls -l /etc/nginx/certs/

    echo "✅ SSL certificates decoded and saved successfully."
}

# Function to copy environment files
copy_env() {
    echo "🔄 Copying environment files..."

    if [ ! -L frontend/.env ]; then
        cp ./.env frontend/.env
        echo "✅ Environment file copied to frontend."
    else
        echo "⚠️  Env file frontend/.env already exists."
    fi

    if [ ! -L backend/users/management/commands/.env ]; then
        cp ./.env backend/users/management/commands/.env
        echo "✅ Environment file copied to backend."
    else
        echo "⚠️  Env file backend/users/management/commands/.env already exists."
    fi
}

# Function to create production .env file
create_env() {
    echo "📄 Creating production .env file..."
    [[ -f .env ]] && rm .env && echo "✅ Old .env removed."
    touch .env
    cat ./.secrets >> .env
    echo "HOST_IP=$HOSTNAME" >> .env
    echo "FRONTEND_URL=https://$HOSTNAME" >> .env
    echo "REACT_APP_BACKEND_URL=https://$HOSTNAME" >> .env
    echo "REACT_APP_BACKEND_WS=wss://$HOSTNAME" >> .env
    echo "NGINX_SERVER_NAME=$HOSTNAME" >> .env
    echo "✅ Production .env file created."
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
generate_certificates
create_env
copy_env
configure_nginx

echo "✅ Render process completed successfully!"
