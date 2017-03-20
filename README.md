# log-service

> Simple logging service for sammler.

[![CircleCI](https://img.shields.io/circleci/project/github/sammler/log-service.svg)](https://circleci.com/gh/sammler/log-service)  
[![Greenkeeper badge](https://badges.greenkeeper.io/sammler/log-service.svg)](https://greenkeeper.io/)

## Purpose
_log-service_ is a very simple logging service, which just acts as a temporary solution to get some logging up and running.

It logs to MongoDB and exposes some endpoints to create and to retrieve logs.

The solution was primarily created, because the [ELK-stack](https://github.com/deviantony/docker-elk) just felt to heavy (> 1.5 GB RAM needed) for _sammler_.

## Configuration
_log-service_ can be configured by the following environment variables:

- `PORT` - The port to run the REST API (defaults to `3004`).
- `SAMMLER_DB_URI_LOGS` - MongoDB connection, e.g. `mongodb://localhost:27017/logs`

## Features
The functionality of _log-service_ is documented in a swagger file, available at [http://localhost:3004/api-docs](http://localhost:3004/api-docs) when running the image.

Alternatively api-docs is also available [here](./docs/api-docs.md).

## Development
Run 

```sh
$ yarn dc-dev-up
```

Which will spin up a MongoDB instance at port 27018 (to prevent conflicts with the default port).

Then run the tests:

```
$ yarn run test
```

## Author
**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License
MIT

