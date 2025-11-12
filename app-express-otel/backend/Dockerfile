FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install
RUN npm install prom-client

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]