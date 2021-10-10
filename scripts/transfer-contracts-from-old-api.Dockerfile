ARG GIT_REF="master"
ARG OUT_DIR="schemas"
ARG CONTRACTS="NotFoundModel SingleHistoryEventModel"

FROM alpine/git:v2.32.0 AS api-release
ARG GIT_REF
ENV GIT_REF=$GIT_REF
WORKDIR /wyin-be-feed
RUN git clone \
    https://gitlab.com/spio-wyin/wyin-be-feed.git /wyin-be-feed && \
    git checkout $GIT_REF

FROM python:3.7-alpine AS wyin-be-feed
ARG CONTRACTS
ARG OUT_DIR
ENV CONTRACTS=$CONTRACTS
ENV OUT_DIR=$OUT_DIR
COPY --from=api-release /wyin-be-feed/feed /feed
COPY --from=api-release /wyin-be-feed/requirements.txt /
WORKDIR /
RUN pip install -r requirements.txt
RUN mkdir /$OUT_DIR && \
    for contract in $CONTRACTS; do \
        python -c \
            "from feed.models import history; print(history.$contract.schema_json(indent=2))" > \
            /"$OUT_DIR/$contract.schema.json"; \
    done
