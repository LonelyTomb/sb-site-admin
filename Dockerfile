FROM node:15 as build


RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ARG NUXT_HOST=0.0.0.0
ARG API_URL
ARG BASE_URL
ARG NUXT_MODE
ARG APP_AWS_ID
ARG APP_AWS_SECRET_ACCESS_KEY
#ARG NUXT_PORT=8081
ARG NODE_ENV=staging

ENV NUXT_HOST $NUXT_HOST
ENV API_URL $API_URL
ENV BASE_URL $BASE_URL
ENV NUXT_MODE $NUXT_MODE
ENV APP_AWS_ID $APP_AWS_ID
ENV APP_AWS_SECRET_ACCESS_KEY $APP_AWS_SECRET_ACCESS_KEY
#ENV NUXT_PORT $NUXT_PORT
ENV NODE_ENV $NODE_ENV
ENV PATH /usr/src/app/node_modules/.bin:$PATH

#RUN echo "${NUXT_HOST}"

COPY package.json /usr/src/app/package.json

RUN yarn

COPY . /usr/src/app

RUN yarn run generate

### STAGE 2: NGINX ###
FROM nginx:1.13

COPY --from=build /usr/src/app/docker /usr/share/nginx/html/
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
