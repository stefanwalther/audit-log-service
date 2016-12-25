# sammler-log-service

> Simple logging service for sammler.

[![CircleCI](https://img.shields.io/circleci/project/github/sammler/sammler-log-service.svg)](https://circleci.com/gh/sammler/sammler-log-service)

## Configuration
_sammler-log-service_ can be configured by the following environment variables:

- `PORT` - The port to run the REST API (defaults to `3004`).

## Purpose
_sammler-log-service_ is a very simple logging service, which just acts as a temporary
solution to get some logging up and running.

It logs to MongoDB and exposes some endpoints to create and to retrieve logs.

The solution will potentially be replaced or extended in the future.

## Features
The functionality of _sammler-log-service_ is documented in a swagger file, available at [http://localhost:3004/api-docs](http://localhost:3004/api-docs) when running the image.

## Author
**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License
Released under the MIT license.

