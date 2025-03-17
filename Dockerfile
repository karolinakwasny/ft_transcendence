# --- Stage 1: Build React App ---
	FROM node:20-alpine AS builder

	# Set working directory in the container
	WORKDIR /app
	
	# Copy package.json and install dependencies
	COPY ./frontend/package.json ./frontend/package-lock.json ./
	RUN npm install --omit=dev
	
	# Copy React files and build the app
	COPY ./frontend ./
	RUN npm run build
	
	# --- Stage 2: Prepare Backend (Django) ---
	FROM python:3.9-alpine AS backend
	
	# Environment variables
	ENV PYTHONDONTWRITEBYTECODE=1
	ENV PYTHONUNBUFFERED=1
	
	# Set working directory for the backend
	WORKDIR /app
	
	# Copy requirements file and install dependencies
	COPY ./backend/requirements.txt /app/
	RUN pip install --no-cache-dir -r requirements.txt
	
	# Install necessary system dependencies for backend
	RUN apk update && apk add --no-cache \
		gcc \
		musl-dev \
		postgresql-dev \
		libffi-dev \
		openssl-dev \
		pkgconfig \
		linux-headers \
		build-base \
		&& apk del build-base
	
	# Copy the backend application code
	COPY ./backend /app/
	
	# Ensure the media directory exists
	RUN mkdir -p /app/media/avatars
	COPY ./backend/media /app/media/
	
	# Expose Django backend port
	EXPOSE 8000
	
	# Add script to start the Django server
	COPY ./backend/script.sh /app/
	RUN chmod +x /app/script.sh
	
	# --- Stage 3: Set up Nginx as a Reverse Proxy ---
	FROM nginx:stable-alpine AS nginx
	
	# Install necessary tools, including envsubst
	RUN apk update && apk add --no-cache gettext netcat-openbsd iputils
	
	# Copy the template nginx.conf for reverse proxy with environment variable support
	COPY ./nginx/nginx.conf /etc/nginx/nginx.template
	COPY ./nginx/certs /etc/nginx/certs
	
	# Copy the React app build to Nginx public folder
	COPY --from=builder /app/build /usr/share/nginx/html
	
	# Expose Nginx port
	EXPOSE 80 443
	
	# Set up Nginx to use the template and environment variables, then start the server
	CMD envsubst '$NGINX_SERVER_NAME' < /etc/nginx/nginx.template > /tmp/nginx.conf && nginx -c /tmp/nginx.conf -g "daemon off;"
	
	# --- Stage 4: PostgreSQL setup (not included in Dockerfile, use official image) ---
	# Render will automatically handle PostgreSQL via a dedicated service.
	# Ensure to configure your Django to use the correct PostgreSQL host & credentials.
	