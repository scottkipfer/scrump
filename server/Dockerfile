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

ENV MONGO_URL=mongodb://localhost:27017/scrump

CMD node app.js
