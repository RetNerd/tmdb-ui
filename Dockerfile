FROM node:16.14.2 as builder


WORKDIR /app
ADD ./src /app/src
ADD ./public /app/public
ADD ./tsconfig.json /app/tsconfig.json
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json

RUN npm install && npm run build

FROM nginx:alpine
ENV PORT=8080
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/build .
COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

CMD /bin/sh /start.sh

