FROM node:12.13.1-alpine
# make the 'app' folder the current working directory
WORKDIR /app

# add node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package.json /app/
RUN npm install
RUN npm install @vue/cli -g

EXPOSE 8080
EXPOSE 9200
EXPOSE 9300
EXPOSE 9600

CMD [ "npm", "run", "serve"]