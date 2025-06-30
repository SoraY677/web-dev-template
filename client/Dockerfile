FROM node:alpine

COPY . /client
WORKDIR /client

RUN yarn install

EXPOSE ${CLIENT_PORT}
