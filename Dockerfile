
FROM node:10

WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

RUN npm run start

EXPOSE 8080


