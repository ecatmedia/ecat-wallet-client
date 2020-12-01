# build environment
FROM node:12.2.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV HTTPS true
COPY package.json /app/package.json

# RUN npm install yarn -g
RUN yarn

COPY . /app

RUN yarn build

# production environment
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/static/js/*.map

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
