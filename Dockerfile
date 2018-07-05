FROM node:8

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install
RUN npm install nodemon

EXPOSE 3001

CMD [ "npm", "start" ]
