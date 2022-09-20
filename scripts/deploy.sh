#!/bin/sh
CONTAINER_NAME="frontend"

# shellcheck disable=SC2039
if [ ! "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=${CONTAINER_NAME})" ]; then
        # cleanup
        docker stop ${CONTAINER_NAME}
        docker rm ${CONTAINER_NAME}
    fi
    echo "docker not exit"
fi