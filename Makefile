front:
	docker-compose -f app/frontend_service/docker-compose.front.yml up --build

game:
	docker-compose -f app/game_service/docker-compose.game.yml up --build

user:
	docker-compose -f app/user_profile_service/docker-compose.user.yml up --build 

gateway:
	docker build -t gateway_service ./app/gateway_service

up:
	docker-compose up --build  

down:
	docker-compose down --remove-orphans

re: down up

prune:
	docker system prune -af
