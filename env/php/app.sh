#!/bin/bash

DOCROOT="$(pwd)/public"
HOST=0.0.0.0
PORT=1336

if [ ! -z "$1" ]; then
	PORT=$1
fi

PHP=$(which php)

if [ $? != 0 ] ; then
	echo "Unable to find PHP"
	exit 1
fi

$PHP -S "${HOST}:${PORT}" -t "${DOCROOT}"

