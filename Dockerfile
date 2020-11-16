FROM alpine:3.11 as builder
RUN apk --no-cache add gcc g++ make python nodejs npm

WORKDIR /planet
COPY package-lock.json ./package-lock.json
COPY package.json ./package.json
RUN npm ci
COPY . .
RUN npm run build

FROM alpine:3.11
RUN apk --no-cache add nodejs
WORKDIR /planet
COPY --from=builder /planet/node_modules ./node_modules
COPY --from=builder /planet/server.js .
COPY --from=builder /planet/dist ./dist

CMD ["node", "server.js"]
