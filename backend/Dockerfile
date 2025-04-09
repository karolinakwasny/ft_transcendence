FROM python:3.9-alpine

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY backend/requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

# Install necessary system dependencies
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

# Copy application code
COPY . /app/

# ✅ Ensure the media directory exists
RUN mkdir -p /app/media/avatars

# ✅ Copy default media files from your local machine into the container
COPY backend/media/ /app/media/

# Expose Django application port
EXPOSE 8000

# Ensure script is executable
RUN chmod +x backend/script.sh

# Start the application
CMD ["backend/script.sh"]


