_{%=name%}_ is a very simple logging service, which just acts as a temporary solution to get some logging up and running.

It logs to MongoDB and exposes some endpoints to create and to retrieve logs.

The solution was primarily created, because the [ELK-stack](https://github.com/deviantony/docker-elk) just felt to heavy (> 1.5 GB RAM needed) for _sammler_.