FROM node:carbon-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g pm2
COPY . /app
EXPOSE 2700
EXPOSE 2701

## THE LIFE SAVER

ENV MONGO_URL=mongodb://mongo-e.mongodb.e2e.smoketest.aws.ecnext.net:27107,mongo-b.mongodb.e2e.smoketest.aws.ecnext.net:27017,mongo-d.mongodb.e2e.smoketest.aws.ecnext.net:27017/scrump?replicaSet=smoketest

CMD cd server && pm2 start app.js --no-daemon --watch
