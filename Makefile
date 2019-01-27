REPO = sammlerio
SERVICE = audit-log-service
VER=latest

help:																								## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

gen-readme:																					## Generate README.md (using docker-verb).
	docker run --rm -v ${PWD}:/opt/verb stefanwalther/verb
.PHONY: gen-readme

build:																							## Build the docker image.
	docker build -t ${REPO}/${SERVICE} .
.PHONY: build

build-test:								## Build the docker image (test image)
	docker build --force-rm -t ${REPO}/${SERVICE}-test -f Dockerfile.test .
.PHONY: build-test

get-image-size:
	docker images --format "{{.Repository}} {{.Size}}" | grep ${REPO}/${SERVICE} | cut -d\   -f2
.PHONY: get-image-size

setup:
	@echo "Setup ... nothing here right now"
.PHONY: setup

gen-version-file:
	@SHA=$(shell git rev-parse --short HEAD) \
		node -e "console.log(JSON.stringify({ SHA: process.env.SHA, version: require('./package.json').version, buildTime: (new Date()).toISOString() }))" > version.json
.PHONY: gen-version-file

build: build-image
.PHONY: build

build-image:
	$(MAKE) gen-version-file
	docker build -t $(REPO)/$(SERVICE) .
.PHONY: build-image

build-ci:
	$(MAKE) build-image
	docker tag $(REPO)/$(SERVICE):latest $(REPO)/$(SERVICE):$(shell cat ./version.json)
.PHONY: build-ci

up-deps:																				## Start required services (daemon mode).
	docker-compose --f docker-compose.deps.yml up -d
.PHONY: up-deps

up-deps-i:																			## Start required services (interactive mode).
	docker-compose --f docker-compose.deps.yml up
.PHONY: up-deps-i

down-deps:																			## Tear down required services.
	docker-compose --f docker-compose.deps.yml down -t 0
.PHONY: down-deps

up-i:
	docker-compose up
.PHONY: up-i

down:
	docker-compose down -t 0
.PHONY: down

run-lint:
	docker-compose --f=docker-compose.tests.yml run §{SERVICE}-test npm run lint
.PHONY: run-lint

run-tests: 								## Run tests
	docker-compose --f=docker-compose.tests.yml run ${SERVICE}-test npm run test
.PHONY: run-tests

circleci:																				## Simulate CircleCI tests
	$(MAKE) build
	$(MAKE) build-test
	$(MAKE) run-tests
.PHONY: circleci

circleci-validate: 																	## Validate the circleci config.
	circleci config validate
.PHONY: circleci-validate
