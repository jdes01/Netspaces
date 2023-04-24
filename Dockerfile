FROM node:18.15-alpine as netspaces-base

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm --mount=type=cache,target=/root/.cache npm ci

# ===============================

FROM netspaces-base as netspaces-web

COPY ./apps/web .

EXPOSE 3000

CMD ["npx", "nx", "run", "web:serve", "--hostname=0.0.0.0", "--port=3000"]

# ===============================

FROM netspaces-base as netspaces-api

COPY ./apps/api .

EXPOSE 3333

CMD ["npx", "nx", "serve", "api"]