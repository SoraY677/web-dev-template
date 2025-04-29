#
# Base
#
.PHONY: exec
exec:
	docker run -i -v .:/app -w /app --rm node:22 bash -c "yarn && ${COMMAND}"

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
	make exec COMMAND="yarn lint"
.PHONY: lint-fix
lint-fix:
	make exec COMMAND="yarn lint:fix"

#
# Setup 
#
.PHONY: setup-client
setup-client:
	make exec COMMAND="yarn create vite client"

.PHONY: setup-server
setup-server:
	make exec COMMAND="yarn create vite server"

.PHONY: setup
setup:
	make exec COMMAND="yarn setup"

