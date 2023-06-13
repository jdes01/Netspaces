FROM node:18.15-alpine as base

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm --mount=type=cache,target=/root/.cache npm ci

# ===============================

FROM base as web

COPY ./apps/web .

EXPOSE 3000

CMD ["npx", "nx", "run", "web:serve", "--hostname=0.0.0.0", "--port=3000"]

# ===============================

FROM base as api

COPY ./apps/api .

EXPOSE 3333

CMD ["npx", "nx", "serve", "api"]

FROM base as booking

COPY ./apps/booking .

EXPOSE 3333

CMD ["npx", "nx", "serve", "booking"]

FROM base as gateway

COPY ./apps/gateway .

EXPOSE 3000

CMD ["npx", "nx", "serve", "gateway"]