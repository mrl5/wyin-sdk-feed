#!/bin/bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SCHEMAS_FOLDER="schemas"
SCHEMAS_DIR="$(dirname $SCRIPT_DIR)/$SCHEMAS_FOLDER"
TYPES="SingleHistoryEvent NotFound Language"

set -e -u -o pipefail

main() {
    for type in $TYPES; do
        local target="${SCHEMAS_DIR}/${type}.schema.json"
        yarn run -s typescript-json-schema --required src/types.ts $type > \
            "$target" && git add "$target"
    done
}

main
