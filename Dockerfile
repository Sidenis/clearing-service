FROM node:12.4-alpine
WORKDIR /app
COPY ./ /app

RUN npm install
EXPOSE 5000

CMD npm run start