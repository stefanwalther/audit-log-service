FROM sammlerio/node

ARG PORT=3004
ENV PORT=$PORT

RUN npm install nodemon -g

ENV HOME /home
RUN mkdir -p $HOME
WORKDIR $HOME

COPY package.json package-lock.json ./

RUN npm install

COPY /src ./src/

EXPOSE $PORT

CMD ["npm", "run", "start"]
