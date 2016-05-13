#!/usr/bin/env node
'use strict';

var port=1337;
if ('undefined' !== typeof process.argv[2]) {
	port = process.argv[2]
}

var express = require('express');
var swig    = require('swig');
var util    = require('util');

var app = express();

// custom template engine

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../../src/views');

// disable Express view cache

app.set('view cache', false);

app.use(express.static(__dirname + '/../../src/static'));

var routes = require(__dirname + '/../../src/routes.json');
var data = require(__dirname + '/../../src/data.json');

for ( var route in routes ) {
	app.get(route, function (req, res) {
		var context = util._extend({}, data);
		util._extend(context, routes[req.route.path].data); 
		res.render(routes[req.route.path].file, context);
	});
}

app.listen(port, function () {
	console.log('App listening on port '+port);
});

