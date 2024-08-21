FROM nginx:alpine

RUN apk update && apk upgrade && \
    apk add --no-cache openssl gettext

RUN 	mkdir -p /etc/nginx/certs
RUN 	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout /etc/nginx/certs/cert.key \
		-out /etc/nginx/certs/cert.crt \
		-subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
	

COPY nginx.conf /etc/nginx/nginx.conf

COPY nginx_script.sh /usr/local/bin/nginx_script.sh

RUN chmod +x /usr/local/bin/nginx_script.sh

EXPOSE 80
EXPOSE 443


CMD ["/usr/local/bin/nginx_script.sh"]
