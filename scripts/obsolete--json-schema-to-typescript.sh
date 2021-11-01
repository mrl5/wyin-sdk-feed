#!/bin/bash

IMAGE_NAME="ts-artifacts"
CONTAINER_NAME="extract-ts-artifacts"
CONTAINER_OUT_DIR="artifacts"
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SCHEMAS_FOLDER="schemas"
SCHEMAS_DIR="$(dirname $SCRIPT_DIR)/$SCHEMAS_FOLDER"
DOCKERFILE="$SCRIPT_DIR/json-schema-to-typescript.Dockerfile"
TARGET_DIR="$(dirname $SCRIPT_DIR)/src/contracts"

set -e -u -o pipefail
trap 'cleanup $? $LINENO' EXIT

main() {
    local schemas_dir="$1"

    echo "[ ] Copying schemas ..."
    copy_schemas_to_working_dir "$schemas_dir"
    echo "[+] Done"

    echo "[ ] Creating artifacts ..."
    cd "$SCRIPT_DIR"
    build_container_with_artifacts "$SCHEMAS_FOLDER"
    cd -
    echo "[+] Done"

    echo "[ ] Extracting artifacts ..."
    get_artifacts
    echo "[+] Done"

    echo "[i] Artifacts are in $TARGET_DIR"
}

copy_schemas_to_working_dir() {
    cp -rv "$SCHEMAS_DIR" "$SCRIPT_DIR"
}

build_container_with_artifacts() {
    local schemas_dir="$1"

    docker build \
        --build-arg SCHEMAS_DIR="$schemas_dir" \
        --build-arg OUT_DIR="$CONTAINER_OUT_DIR" \
        -f "$DOCKERFILE" \
        -t $IMAGE_NAME .
}

get_artifacts() {
    docker container create --name $CONTAINER_NAME $IMAGE_NAME:latest
    docker container cp $CONTAINER_NAME:/$CONTAINER_OUT_DIR "$SCRIPT_DIR"
    mkdir -p "$TARGET_DIR"
    mv -v "$SCRIPT_DIR/$CONTAINER_OUT_DIR"/*.ts "$TARGET_DIR/"
}

cleanup() {
    if [ "$1" != "0" ]; then
        echo "Error $1 occurred on $2"
    fi
    docker container rm -f $CONTAINER_NAME
    rm -rf "$SCRIPT_DIR/$SCHEMAS_FOLDER"
    rm -rf "$SCRIPT_DIR/$CONTAINER_OUT_DIR"
}

main "$SCHEMAS_DIR"
