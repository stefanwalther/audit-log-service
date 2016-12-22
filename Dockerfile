FROM kkarczmarczyk/node-yarn:7.2-slim
MAINTAINER Stefan Walther

ARG API_PORT=3004
ENV API_PORT=$API_PORT

ENV HOME /home
RUN mkdir -p $HOME

WORKDIR $HOME

COPY package.json yarn.lock index.js /src ./

RUN yarn install

EXPOSE $API_PORT

CMD ["yarn", "run", "start"]
