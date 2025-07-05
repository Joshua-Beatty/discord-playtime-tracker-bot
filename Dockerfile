FROM node:24-alpine

RUN apk add python3 make gcc g++

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .

CMD ["npm", "start"]
