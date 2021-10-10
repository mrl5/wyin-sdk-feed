ARG SCHEMAS_DIR="schemas"
ARG OUT_DIR="artifacts"

FROM node:14-alpine
ARG SCHEMAS_DIR
ARG OUT_DIR
ENV SCHEMAS_DIR=$SCHEMAS_DIR
ENV OUT_DIR=$OUT_DIR
ENV PATH=$PATH:node_modules/.bin
WORKDIR /
COPY $SCHEMAS_DIR $SCHEMAS_DIR
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN yarn add json-schema-to-typescript
RUN mkdir $OUT_DIR && \
    for file in "$SCHEMAS_DIR"/*.schema.json; do \
        json2ts "$file" > \
            "$OUT_DIR"/"$(basename "$file" | \
                sed 's/\.schema\.json$//' | \
                sed 's/Model$//' | \
                awk '{$1=tolower(substr($1,0,1))substr($1,2)}1' \
            )".ts; \
    done
