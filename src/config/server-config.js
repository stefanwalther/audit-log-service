function getNatsStreamingHost() {
  return process.env.NATS_STREAMING_HOST || 'localhost';
}
function getNatsStreamingPort() {
  return process.env.NATS_STREAMING_PORT || '4222';
}
function getNatsStreamingServer() {
  return `nats://${getNatsStreamingHost()}:${getNatsStreamingPort()}`;
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: 3004,
  NATS_STREAMING_HOST: getNatsStreamingHost(),
  NATS_STREAMING_PORT: getNatsStreamingPort(),
  NATS_STREAMING_SERVER: getNatsStreamingServer()
};
