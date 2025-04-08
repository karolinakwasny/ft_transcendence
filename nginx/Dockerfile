FROM nginx:stable-alpine

RUN apk update && apk add --no-cache gettext netcat-openbsd iputils

COPY nginx/entrypoint.sh /nginx/entrypoint.sh

RUN chmod +x /nginx/entrypoint.sh

RUN ls -l /nginx/entrypoint.sh

COPY nginx/nginx.conf /etc/nginx/nginx.template

ENTRYPOINT ["/nginx/entrypoint.sh"]


