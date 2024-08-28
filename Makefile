.PHONY: up down logs setup

up:
	docker-compose up --build

down:
	docker-compose down

clean: down
	docker-compose rm -f
	docker system prune -a --volumes

logs:
	docker-compose logs -f
