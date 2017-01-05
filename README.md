
## DEPRECATED

This project is deprecated and no longer being maintained.

# JTS Web Template Framework

Write templates in any of [Jinja](http://jinja.pocoo.org/)~[Twig](http://twig.sensiolabs.org/)~[Swig](http://paularmstrong.github.io/swig/) and run in Python~PHP~Node.js

### Usage

1. Add HTML views in `src/views`
1. Add static files in `src/static`
1. Write routes in `src/routes.json` and common view data as placeholder in `src/data.json`
1. Run in dev env!

### Development environments

##### Python

```shell
$ cd env/python
$ virtualenv .
$ source bin/activate
$ pip install -r requirements.txt
$ python code/app.py --port=1335
```

##### PHP

```shell
$ cd env/php
$ composer update --prefer-dist --optimize-autoloader
$ sh app.sh 1336
```

##### Node.js

```shell
$ cd env/node
$ npm install
$ node app.js 1337
```

##### Generate website for static hosting

```shell
$ cd env/static
$ npm install
$ gulp
```

