game:
	docker-compose -f app/game_service/docker-compose.game.yml up --build
up:
	docker-compose up --build  

down:
	docker-compose down --remove-orphans

re: down up

prune:
	docker system prune -af
