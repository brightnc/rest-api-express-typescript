FROM node:18.16.0-alpine3.17 as development
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:slim as production
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]

