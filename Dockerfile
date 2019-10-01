FROM node:8
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD ["yarn", "start-app-docker"]