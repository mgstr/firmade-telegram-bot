#!/bin/bash

# build an image for firmade bot.
# usage ./build.sh <version>, where <version> is required parameter

APP_VERSION=$1

if [[ -z "$APP_VERSION" ]]; then
    echo "version is a required parameter"
    exit 1
fi

# pass version inside docker image, so it will be stored in environment variable for script consumption
docker build --build-arg version=$APP_VERSION -t mgstr/firmade-telegram-bot:$APP_VERSION .

# push just build version into repo
docker push mgstr/firmade-telegram-bot:$APP_VERSION

# make 'latest' alias to just build version
docker tag mgstr/firmade-telegram-bot:$APP_VERSION mgstr/firmade-telegram-bot:latest
docker push mgstr/firmade-telegram-bot:latest
