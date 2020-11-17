FROM alpine:3.11 as builder
RUN apk --no-cache add gcc g++ make python nodejs npm

WORKDIR /planet
RUN npm install -g @vue/cli@latest
COPY . .
RUN cd front && npm i
RUN cd server && npm i
RUN cd front && npm run build

FROM alpine:3.11
RUN apk --no-cache add nodejs
WORKDIR /planet
COPY --from=builder /planet/server .

CMD ["node", "server.js"]
