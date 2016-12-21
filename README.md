# firmade-telegram-bot

Bot for [Telegram](https://telegram.org/) messenger to search companies registered in Estonia.
Use [mgstr/firamad](https://github.com/mgstr/firmad) image with pre-populated PostgreSQL database.

## Build a docker image with bot

```
docker build -t mgstr/firmade-telegram-bot .
docker push mgstr/firmade-telegram-bot
```

## Start bot

### Using docker-compose

* create `.env` file following content:
```
TOKEN=<TELEGRAM_TOKEN>
```
* use docker-compose to start containers `docker-compose run -d bot`

### Using docker

* create `companies.env` file with following content:
```
TOKEN=<TELEGRAM_TOKEN>
PGHOST=firmad
PGUSER=postgres
PGPASSWORD=password
PGDATABASE=postgres
```

* start container with DB

`docker run --name firmad -d mgstr/firmad`

* start container with bot code and link it with db container

`docker run --name firmade-bot --link firmad -d --env-file companies.env mgstr/firmade-telegram-bot`
