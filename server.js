/* eslint-disable */
var path = require('path');
var express = require('express');

var app = express();

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use('/build', express.static(path.join(__dirname, 'build')));

  // Express serve up index.html file if it doesn't recognize route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });
}

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});
