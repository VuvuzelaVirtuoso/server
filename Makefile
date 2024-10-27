PORT?=80
ifeq ($(CODESPACES), true)
	HOST="$(CODESPACE_NAME)-$(PORT).$(GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN)"
else
  HOST="localhost"
endif
POSTGRES_USER?="postgres"
POSTGRES_PASSWORD?="postgres"

.PHONY: check
check:
	@echo "HOST=$(HOST)"
	@echo "PORT=$(PORT)"
	@echo "POSTGRES_USER=$(POSTGRES_USER)"
	@echo "POSTGRES_USER=$(POSTGRES_USER)"
	@echo "STEAM_API_KEY=$(STEAM_API_KEY)"
	@echo "SECRET=$(SECRET)"

.PHONY: check_key
check_key:
ifeq ($(STEAM_API_KEY),)
	@echo "MUST DECLARE STEAM_API_KEY"
	exit 1
else
	exit 0
endif

.PHONY: check_secret
check_secret:
ifeq ($(SECRET),)
	@echo "MUST DECLARE SECRET"
	exit 1
else
	exit 0
endif

.PHONY: build
build:
	docker-compose build

.PHONY: run
run: check_key check_secret
	HOST="$(HOST)" \
	PORT="$(PORT)" \
	POSTGRES_USER="$(POSTGRES_USER)" \
	POSTGRES_PASSWORD="$(POSTGRES_PASSWORD)" \
	STEAM_API_KEY="$(STEAM_API_KEY)" \
	SECRET="$(SECRET)" \
	docker-compose up --build
