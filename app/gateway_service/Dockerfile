FROM nginx:alpine

RUN apk update; apk upgrade; apk add nginx; apk add openssl; apk add --no-cache gettext

COPY nginx.conf /etc/nginx/nginx.conf

COPY nginx_script.sh /usr/local/bin/nginx_script.sh

RUN chmod +x /usr/local/bin/nginx_script.sh

EXPOSE 80

CMD ["/usr/local/bin/nginx_script.sh"]
