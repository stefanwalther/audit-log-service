FROM kkarczmarczyk/node-yarn:7.2-slim
MAINTAINER Stefan Walther

ARG PORT=3004
ENV PORT=$PORT

ENV HOME /home
RUN mkdir -p $HOME

WORKDIR $HOME

COPY package.json yarn.lock index.js ./

RUN yarn install

COPY /src ./src/

EXPOSE $PORT

CMD ["yarn", "run", "start"]
