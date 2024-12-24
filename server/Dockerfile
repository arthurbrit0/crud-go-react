FROM golang:1.23.1-alpine AS builder

RUN apk add --no-cache git

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod tidy

COPY . .

RUN go build -o server .

FROM alpine:latest

WORKDIR /app/

RUN apk add --no-cache bash

COPY --from=builder /app/server .

COPY --from=builder /app/.env .

COPY --from=builder /app/scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh

RUN chmod +x server /usr/local/bin/wait-for-it.sh

EXPOSE 8080

CMD ["wait-for-it.sh", "db:5432", "--", "./server"]


