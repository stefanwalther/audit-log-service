FROM kkarczmarczyk/node-yarn:7.2-slim
MAINTAINER Stefan Walther

ARG API_PORT=3003
ENV API_PORT=$API_PORT

ENV HOME /home
RUN mkdir -p $HOME
RUN mkdir -p $HOME/api

WORKDIR $HOME

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY /src ./src/

EXPOSE $API_PORT

CMD ["yarn", "run", "start"]
