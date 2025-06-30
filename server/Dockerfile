FROM node:alpine

COPY . /server
WORKDIR /server

RUN yarn install

CMD ["yarn", "dev"]

EXPOSE ${SERVER_PORT}
