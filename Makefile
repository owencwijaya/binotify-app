down:
	docker-compose down
build:
	docker-compose build
run: 
	docker-compose up
restart: 
		down 
		build 
		run
