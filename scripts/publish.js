const stan = require('node-nats-streaming').connect('test-cluster', 'publisher');

stan.on('connect', function () {
  console.log('we are connected');

  setInterval(() => {
    publishMsg();
  }, 5000);

});

stan.on('close', function () {
  console.log('we are closed');
});

function publishMsg() {

  let msg = {
    event_name: 'TEST',
    description: 'What so ever',
    source: '/test',
    message: 'Hello NATS-streaming',
    ts: new Date()
  };

  stan.publish('audit-logs', JSON.stringify(msg), function (err, guid) {
    if (err) {
      console.log('publish failed: ', err);
    } else {
      console.log('published message with guid: ', guid);
    }
  });
}

process.on('SIGINT', function () {
  console.log('Caught interrupt signal');

  stan.close();
  process.exit();

});
