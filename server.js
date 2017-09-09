var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var express = require('express');
var app = new (require('express'))()
var port = 3000
var bodyParser = require('body-parser');
var fs = require('fs');
var compiler = webpack(config)

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.get("/data", function(req, res) {
    console.log('I received a GET request');
    var data = fs.readFileSync(__dirname + '/src/data/data.json');
    res.json(JSON.parse(data));
})

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})