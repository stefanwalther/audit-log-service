FROM sammlerio/node

ARG PORT=3004
ENV PORT=$PORT

RUN yarn global add nodemon

ENV HOME /home
RUN mkdir -p $HOME
WORKDIR $HOME

COPY package.json yarn.lock ./

RUN yarn install --force

COPY /src ./src/

EXPOSE $PORT

CMD ["yarn", "run", "start"]
