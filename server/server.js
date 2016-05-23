var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
var config = require('../config');

var AV = require('leanengine');

var app = express();


app.use(bodyParser.urlencoded({ extended: false }));

var falcorMiddleware = require('falcor-express');
var FalcorRouter = require('./falcor-routes-app');
app.use('/model.json', falcorMiddleware.dataSourceRoute(function(req, res) {
  return new FalcorRouter();
}));



app.get('/ping',  function(req, res) {
  res.send('pong');
});

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

var compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname,'..' ,'index.html'));
});


app.listen(config.port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', config.port);
    console.info('==> http://localhost:%s', config.port);
  }
});