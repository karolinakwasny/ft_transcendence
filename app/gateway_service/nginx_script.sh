#!/bin/sh

# Perform any necessary setup here, e.g., generating configuration files, setting environment variables, etc.

#I'm using OpenAPI (Swagger) Editor

echo "Starting NGINX Gateway..."

# Start NGINX
nginx -g 'daemon off;'
