FROM node:16.17.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7500:7501

CMD ["npm", "start"]
