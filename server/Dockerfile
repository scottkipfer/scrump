FROM node:carbon-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 2700
EXPOSE 2701


## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

ENV MONGO_URL=mongodb://mongo-e.mongodb.e2e.smoketest.aws.ecnext.net:27107,mongo-b.mongodb.e2e.smoketest.aws.ecnext.net:27017,mongo-d.mongodb.e2e.smoketest.aws.ecnext.net:27017/scrump?replicaSet=smoketest

CMD node app.js
