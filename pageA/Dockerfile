FROM python:3.10-slim

WORKDIR /app

# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt .

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

# Copy the rest of the application code
COPY . .

# Run the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
