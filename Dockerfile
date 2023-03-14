FROM golang as build-go
WORKDIR /script_sweep_go
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /bin/script_sweep_go .

FROM alpine:latest
RUN addgroup -S script_sweep_go && adduser -S script_sweep_go -G script_sweep_go
USER script_sweep_go
WORKDIR /home/script_sweep_go
COPY --from=build-go /bin/script_sweep_go ./
EXPOSE 3000
ENTRYPOINT ["./script_sweep_go"]