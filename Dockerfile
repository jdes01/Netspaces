FROM node:18.15-alpine as netspaces-base

WORKDIR /app

COPY ./package.json ./

RUN npm install

# ===============================

FROM netspaces-base as netspaces-web

COPY ./apps/web .

EXPOSE 3000

CMD ["npx", "nx", "run", "web:serve"]

# ===============================

FROM netspaces-base as netspaces-api

COPY ./apps/api .

EXPOSE 3333

CMD ["npx", "nx", "serve", "api"]