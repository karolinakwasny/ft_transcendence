.PHONY: up down logs setup

# Define a setup task that runs the setup_venv.sh scripts
setup:
	cd pageA && ./setup_venv.sh
	cd pageB && ./setup_venv.sh

# Define an up task that calls setup and then brings up Docker containers
up: setup
	docker-compose up --build

down:
	docker-compose down

logs:
	docker-compose logs -f
