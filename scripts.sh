# Build a docker image with bot
docker build -t mgstr/firmade-telegram-bot .
docker push mgstr/firmade-telegram-bot

# Start container with DB
docker run --name firmad -d mgstr/firmad:2016-12-07

# Start container with bot code and link it with db container
docker run --name firmade-bot --link firmad -d --env-file companies.env mgstr/firmade-telegram-bot