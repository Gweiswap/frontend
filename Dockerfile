FROM node:16
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . .
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

RUN yarn build

EXPOSE 3001

CMD ["yarn", "dev"]
