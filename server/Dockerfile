FROM node:alpine

COPY . /server
COPY ../package.json /
WORKDIR /server

RUN yarn install

CMD ["yarn", "dev"]

EXPOSE ${SERVER_PORT}
