FROM node:7.2.0

MAINTAINER mgstr

RUN mkdir -p /src

COPY package.json /src

WORKDIR /src
RUN npm install

CMD node /src/app.js

COPY app.js /src
