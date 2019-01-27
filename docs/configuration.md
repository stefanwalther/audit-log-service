
_{%=name%}_ can be configured by the following environment variables:

**General:**

- `PORT` - The port to run the REST API (defaults to `3004`).

**MongoDB:**

- `MONGODB_DATABASE` - MongoDB database, defaults to `sammlerio`.
- `MONGODB_HOST` - MongoDB host, defaults to `localhost`.
- `MONGODB_PORT` - MongoDB port, defaults to `27017`. 
- `MONGODB_DEBUG` - Whether to use the Mongoose debug mode or not, defaults to `false`.

**NATS-STREAMING:**

- `NATS_STREAMING_HOST` - The host of the nats-streaming server, defaults to `localhost`.
- `NATS_STREAMING_PORT` - The port of the nats-streaming server, defaults to `4222`.