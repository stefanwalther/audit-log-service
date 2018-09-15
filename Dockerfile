# Todo: As soon as we remove all github dependencies, we can work with alpine
# --------------------------------------
#               BASE NODE
# --------------------------------------
FROM node:8.12.0@sha256:d97f5bf54e016ad55dd0475f8710b99be14884ab1afcae8875f8092341264b0c as BASE

ARG PORT=3101
ENV PORT=$PORT

ENV HOME /opt/log-service
RUN mkdir -p $HOME
WORKDIR $HOME

COPY package.json ./

# --------------------------------------
#              DEPENDENCIES
# --------------------------------------
FROM BASE as DEPENDENCIES

RUN npm install --only=production

# copy production node_modules aside
RUN cp -R node_modules prod_node_modules

# install ALL node_modules, including 'devDependencies'
RUN npm install

# --------------------------------------
#                  TEST
# --------------------------------------
# run linters, setup and tests
FROM dependencies AS TEST

COPY .eslintrc.json .
COPY /src ./src/
COPY /test ./test/

RUN  npm run lint:fix && npm run lint && npm run test:unit

# --------------------------------------
#                 RELEASE
# --------------------------------------
FROM node:8.12.0-alpine@sha256:d75742c5fd41261113ed4706f961a21238db84648c825a5126ada373c361f46e as RELEASE

ARG PORT=3000
ENV PORT=$PORT

ENV HOME /opt/log-service
RUN mkdir -p $HOME
WORKDIR $HOME

COPY index.js package.json nodemon.json ./

# copy production node_modules
COPY --from=dependencies $HOME/prod_node_modules ./node_modules
COPY /src ./src/

EXPOSE $PORT

CMD ["npm", "run", "start"]


