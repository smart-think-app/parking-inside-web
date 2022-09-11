#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --test
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/parking-inside-web /usr/share/nginx/html