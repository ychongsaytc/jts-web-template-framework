'use strict';

var gulp   = require('gulp');
var fs     = require('fs');
var util   = require('util');
var swig   = require('swig');
var mkdirp = require('mkdirp');


gulp.task('html', function() {

	var data     = require(__dirname + '/../../src/data.json');
	var routes   = require(__dirname + '/../../src/routes.json');
	var destPath = __dirname + '/dest';

	for (var route in routes) {

		// view data
		var context = util._extend({}, data);
		util._extend(context, routes[route].data);

		// compile template
		var tmpl = swig.compileFile(__dirname + '/../../src/views/' + routes[route].file);
		var html = tmpl(context);

		// write down HTML files
		var viewPath = destPath+route.replace(/(\/+)$/, '');
		mkdirp(viewPath, function (err) {
			if (err) console.error(err)
			console.log('=> flatted: '+viewPath);
		});
		fs.writeFile(viewPath+'/index.html', html, function (err) {
			if (err) console.error(err)
			console.log('=> written: '+viewPath+'/index.html');
		})

	}

});


gulp.task('default', ['html']);

