FROM node:14.16.1

ENV NODE_ENV production

WORKDIR /usr/src/gmaps_react

COPY ["package.json", "yarn.lock*", "./usr/src/gmaps_react/"]

RUN yarn

CMD ["yarn", "build"]

COPY frontend .

RUN yarn global add serve

# Navigate to build folder
WORKDIR /usr/src/gmaps_react/build

# Start the application
CMD serve -p 80 -l 3000 -s .

EXPOSE 3000
