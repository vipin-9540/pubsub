FROM node:22

WORKDIR /app

RUN npm install -g pm2

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=dev

CMD ["pm2-runtime", "index.js"]