# logs

> Simple logging service for sammler.

[![CircleCI](https://img.shields.io/circleci/project/github/sammler/log-service.svg)](https://circleci.com/gh/sammler/log-service)

## Purpose
_logs_ is a very simple logging service, which just acts as a temporary solution to get some logging up and running.

It logs to MongoDB and exposes some endpoints to create and to retrieve logs.

The solution was primarily created, because the [ELK-stack](https://github.com/deviantony/docker-elk) just felt to heavy (> 1.5 GB RAM needed) for _sammler_.

## Configuration
_logs_ can be configured by the following environment variables:

- `PORT` - The port to run the REST API (defaults to `3004`).
- `SAMMLER_DB_URI_LOGS` - MongoDB connection, e.g. `mongodb://localhost:27017/logs`

## Features
The functionality of _logs_ is documented in a swagger file, available at [http://localhost:3004/api-docs](http://localhost:3004/api-docs) when running the image.

Alternatively api-docs is also available [here](./docs/api-docs.md).

## Development
Run 

```sh
$ npm run dc-dev-up
```

Which will spin up a MongoDB instance at port 27018 (to prevent conflicts with the default port).

Then run the tests:

```
$ npm run test
```

## Author
**Stefan Walther**

* [twitter](http://twitter.com/waltherstefan)  
* [github.com/stefanwalther](http://github.com/stefanwalther) 
* [LinkedIn](https://www.linkedin.com/in/stefanwalther/) 

## License
MIT

