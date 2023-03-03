FROM node:19-alpine

WORKDIR /script_sweep

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

CMD ["yarn", "start"]