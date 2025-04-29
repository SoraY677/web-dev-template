ifneq ("$(wildcard .env)", "")
	include .env
	export
endif

#
# Base
#
.PHONY: exec
exec:
	docker compose exec ${CONTAINER} bash -c "$(COMMAND)"

#
# Main
#
.PHONY: start
start:
	docker-compose up -d --build

.PHONY: restart
restart:
	docker-compose restart

.PHONY: stop
stop:
	docker-compose down

.PHONY: lint
lint:
	make exec CONTAINER="root" COMMAND="yarn lint"
.PHONY: lint-fix
lint-fix:
	make exec CONTAINER="root" COMMAND="yarn lint:fix"

#
# Setup 
#
.PHONY: setup-vite
setup-vite:
	make exec CONTAINER="root" COMMAND="yarn create vite ${PROJECT_NAME}"

.PHONY: setup
setup:
	docker run -i -v .:/app -w /app --rm node:22 bash -c "yarn && yarn setup"

