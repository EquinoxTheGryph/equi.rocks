#!/bin/bash

if docker compose > /dev/null 2>&1 ; then
    docker compose up -d --build
else
    echo Docker compose plugin is not installed! Installing now...
    sudo apt install -y docker-compose-plugin
fi
