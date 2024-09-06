# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
		libmariadb-dev \
        pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# Copy the requirements file into the container
COPY ./requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
WORKDIR /code
COPY . .

# Expose the port the app runs on
EXPOSE 7000

RUN chmod +x script_user.sh

CMD ["./script_user.sh"]