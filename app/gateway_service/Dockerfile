FROM nginx:alpine

RUN apk update; apk upgrade; apk add nginx; apk add openssl; apk add --no-cache gettext

RUN 	mkdir -p /etc/nginx/certs
RUN 	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout /etc/nginx/certs/kkwasny.key \
		-out /etc/nginx/certs/kkwasny.crt \
		-subj "/L=Wolfsburg/CN=kkwasny.42.fr"

COPY nginx.conf /etc/nginx/nginx.conf

COPY nginx_script.sh /usr/local/bin/nginx_script.sh

RUN chmod +x /usr/local/bin/nginx_script.sh

EXPOSE 80
EXPOSE 443


CMD ["/usr/local/bin/nginx_script.sh"]
