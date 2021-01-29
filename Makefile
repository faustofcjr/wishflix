.PHONY: help clean test clean-build isort run

.DEFAULT: help

help:
	@echo "options 			Definition"
	@echo "build 				Build the image and fire up the container."
	@echo "build-detached			Build the image and fire up the container in detached mode."
	@echo "up				Create and start containers."
	@echo "up-detached			Create and start containers in detached mode."
	@echo "down				Stop and remove containers, networks, images, and volumes."
	@echo "start				Start docker compose services."
	@echo "stop				Stop docker compose services."
	@echo "logs				View logoutput from containers."
	@echo "logs-follow			View and follow log output from containers."

build:
	@echo "Building the image and fire up the container."
	docker-compose up -d --build

build-detached:
	@echo "Building the image and fire up the container in detached mode."
	docker-compose up -d --build

up:
	@echo "Creating and starting containers"
	docker-compose up

up-detached:
	@echo "Creating and starting containers in detached mode."
	docker-compose up -d --build

down:
	@echo " Stopping and removing containers, networks, images, and volumes."
	docker-compose down

start:
	@echo "Starting docker compose services.."
	docker-compose start

start-detached:
	@echo "Starting docker compose services in detached mode."
	docker-compose start -d

stop:
	@echo "Stopping docker compose services."
	docker-compose stop

logs:
	@echo "View logoutput from containers."
	docker-compose logs

logs-follow:
	@echo "View and follow log output from containers."
	docker-compose logs -f
