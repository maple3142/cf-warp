FROM node:12-alpine AS build
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .

FROM gcr.io/distroless/nodejs:12
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["/nodejs/bin/node", "cli.js"]
