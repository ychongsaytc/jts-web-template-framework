#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
import tornado.ioloop
import tornado.web
import tornado.options
import tornado.template
import jinja2

abspath = os.path.dirname(os.path.abspath(__file__))

### command line options

tornado.options.define('port', default=1335, help='run on the given port', type=int)

### template overwrite

class FixedTemplate(jinja2.Template):
	def generate(self, **kwargs):
		return self.render(**kwargs)

jinja2.Environment.template_class = FixedTemplate

class Jinja2Loader(tornado.template.Loader):
	def _create_template(self, name):
		env = jinja2.Environment(loader=jinja2.FileSystemLoader(self.root))
		return env.get_template(name)

### handlers

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		context = data.copy()
		if 'data' in routes[self.request.path]:
			context.update(routes[self.request.path]['data'])
		self.render(routes[self.request.path]['file'], **context)

### tornado application

if __name__ == '__main__':

	tornado.options.parse_command_line()

	settings = {
		'template_loader': Jinja2Loader(abspath+'/../../../src/views'),
		'debug'          : True,
	}

	with open(abspath+'/../../../src/routes.json') as file:    
		routes = json.load(file)

	with open(abspath+'/../../../src/data.json') as file:    
		data = json.load(file)

	handlers = list()

	for route in routes:
		handlers.append((route, MainHandler));

	handlers.append((r'/(.*)', tornado.web.StaticFileHandler, {'path': abspath+'/../../../src/static'}));

	application = tornado.web.Application(handlers, **settings)
	application.listen(tornado.options.options.port)
	tornado.ioloop.IOLoop.instance().start()

