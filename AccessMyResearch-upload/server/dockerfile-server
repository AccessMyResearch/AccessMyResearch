FROM node:12.13.1-alpine
COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "npm", "run", "start"]