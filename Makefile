.PHONY: up down logs setup

up:
	docker-compose up --build

down:
	docker-compose down

clean: down
	docker-compose rm -f
	# docker system prune -a --volumes

re: clean
	docker-compose up --force-recreate --remove-orphans

logs:
	docker-compose logs -f
