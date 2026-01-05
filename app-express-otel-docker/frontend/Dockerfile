FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./public ./public
RUN npm run build

# Dockerfile do frontend
FROM nginx:alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]