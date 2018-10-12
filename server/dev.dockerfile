FROM node:carbon-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g pm2
COPY . /app
EXPOSE 2700
EXPOSE 2701

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && cd server && pm2 start app.js --no-daemon --watch
