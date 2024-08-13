up:
	docker-compose up --build  

down:
	docker-compose down --remove-orphans

prune:
	docker system prune -af
