#!/bin/sh

set -x 

SSL="./nginx/certs"
HOSTNAME="localhost"

createDir() {
    mkdir -p "$1"
}

# Function to generate SSL certificates
generate_certificates() {
    echo "🔍 Checking SSL certificates..."
    createDir "$SSL"

    if [ -f "$SSL/privkey.key" && -f "$SSL/fullchain.crt" ]; then
        echo "🟢 Certificates already exist."
    else
        echo "🔧 Generating new SSL certificates..."
        docker run --rm --hostname "$HOSTNAME" -v "$SSL":/certs -it alpine sh -c \
        'apk add --no-cache nss-tools curl && \
        curl -JLO "https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64" && \
        mv mkcert-v1.4.4-linux-amd64 /usr/local/bin/mkcert && chmod +x /usr/local/bin/mkcert && \
        mkcert -install && mkcert -key-file /certs/privkey.key -cert-file /certs/fullchain.crt '"$HOSTNAME"

        echo "✅ SSL certificates generated successfully."
    fi
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
