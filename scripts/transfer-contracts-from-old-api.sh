#!/bin/bash

RELEASE_VERSION="v0.3.3"
CONTRACTS="NotFoundModel SingleHistoryEventModel"
CONTAINER_OUT_DIR="schemas"
IMAGE_NAME="py-artifacts"
CONTAINER_NAME="extract-py-artifacts"
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DOCKERFILE="$SCRIPT_DIR/transfer-contracts-from-old-api.Dockerfile"
TARGET_DIR=$(dirname $SCRIPT_DIR)

set -e -u -o pipefail
trap 'cleanup $? $LINENO' EXIT

main() {
    local contracts="$1"
    local release_version="$2"

    echo "[ ] Creating artifacts ..."
    build_container_with_artifacts "$contracts" "$release_version"
    echo "[+] Done"

    echo "[ ] Extracting artifacts ..."
    get_artifacts
    echo "[+] Done"

    echo "[i] Artifacts are in $TARGET_DIR/$CONTAINER_OUT_DIR"
}

build_container_with_artifacts() {
    local contracts="$1"
    local release_version="$2"

    docker build \
        --build-arg CONTRACTS="$contracts" \
        --build-arg GIT_REF="$release_version" \
        --build-arg OUT_DIR="$CONTAINER_OUT_DIR" \
        -f "$DOCKERFILE" \
        -t $IMAGE_NAME .
}

get_artifacts() {
    docker container create --name $CONTAINER_NAME $IMAGE_NAME:latest
    docker container cp $CONTAINER_NAME:/$CONTAINER_OUT_DIR $TARGET_DIR
}

cleanup() {
    if [ "$1" != "0" ]; then
        echo "Error $1 occurred on $2"
    fi
    docker container rm -f $CONTAINER_NAME
}


main "$CONTRACTS" "$RELEASE_VERSION"
