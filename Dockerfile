FROM node:10

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN npm rebuild node-sass
COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
