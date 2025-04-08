FROM node:20-alpine AS builder

WORKDIR /app

# Accept API URL at build time
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --omit=dev


COPY frontend .
RUN REACT_APP_BACKEND_URL=https://django-9mgr.onrender.com npm run build

# --- Second stage: Use Nginx for serving static files ---
FROM nginx:1.23.1-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R appuser:appgroup /var/cache/nginx

COPY --from=builder /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

USER appuser

CMD ["nginx", "-g", "daemon off;"]





