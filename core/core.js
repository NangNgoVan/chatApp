var server = require('../app.js');

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Listening on port 3000!');
});
