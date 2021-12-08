FROM node:14.16.1

ENV NODE_ENV development

WORKDIR /gmaps_react/frontend/

COPY ["package.json", "yarn.lock*", "./"]

RUN yarn

COPY / .

EXPOSE 3000
EXPOSE 24678

CMD ["yarn", "start"]