var express = require('express');
var app = express();

var response = {};

app.get('/*', function (req, res) {
  var path = req.path;
  // removing unicode character's from string
  path = path.replace('%20',' ').replace('%20',' ').replace('/','');
  // parsing String as Date
  var unix = Date.parse(path);
  // if a vaild natural date
  if (!isNaN(unix)) {

      var natural = new Date(unix);
      natural = natural.toDateString();
      natural = natural.slice(4);
      // set JSON response
      response.unix = unix;
      response.natural = natural;
  }
  // else if valid unix date
  else if(!isNaN(Number(path)) && Number(path) !== 0) {
    // 
    unix = path;
    natural = new Date(Number(path));
    natural = natural.toDateString();
    natural = natural.slice(4);
    // set JSON response
    response.unix = unix;
    response.natural = natural;
  }
  // anything else
  else {
    // set JSON response
    response.unix = null;
    response.natural = null;
  }
  // sending the JSON response
  res.json(response);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});