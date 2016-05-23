var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var app = express();
// var compiler = webpack(config);

// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// app.use(require('webpack-hot-middleware')(compiler));
app.use('/', express.static('./static/dist/'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/dist/index.html'));
});
app.post('/addItem', function(req, res){
	
});
app.listen(9900, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:9900');
});
