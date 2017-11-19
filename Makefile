REPO = sammlerio
SERVICE = log-service
VER=latest

help:								## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

d-build: 						## Build the docker image (sammlerio/strategy-heartbeat).
	npm run d-build
.PHONY: d-build

d-run: 							## Run the docker-image.
	npm run d-run
.PHONY: d-run

gen-readme: 					## Generate the README.md file.
	npm run docs
.PHONY: gen-readme

circleci-validate: 	## Validate the circleci config.
	circleci config validate
.PHONY: circleci-validate

circleci-build:			## Build circleci locally.
	circleci build
.PHONY: circleci-build

setup:
	@echo "Setup ... nothing here right now"
.PHONY: setup

gen-version-file:
	@SHA=$(shell git rev-parse --short HEAD) \
		node -e "console.log(JSON.stringify({ SHA: process.env.SHA, version: require('./package.json').version, buildTime: (new Date()).toISOString() }))" > version.json
.PHONY: gen-version-file

build-image:
	$(MAKE) gen-version-file
	docker build -t $(REPO)/$(SERVICE) .
.PHONY: build-image

build-ci:
	$(MAKE) build-image
	docker tag $(REPO)/$(SERVICE):latest $(REPO)/$(SERVICE):$(shell cat ./version.json)
.PHONY: build-ci
