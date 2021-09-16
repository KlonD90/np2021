FROM node:16-alpine as builder

RUN mkdir -p /srv/np

WORKDIR /srv/np

ENV LC_ALL="C.utf-8"
ENV LANGUAGE="C.utf-8"
ENV LANG="C.utf-8"

COPY ./package.json  ./package-lock.json /srv/np/

RUN npm ci
COPY ./ /srv/np/

RUN ["npm", "run", "build"]

FROM socialengine/nginx-spa
COPY --from=builder /srv/np/build /app
