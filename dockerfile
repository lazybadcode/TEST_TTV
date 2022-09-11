FROM node:8.15.0-alpine
LABEL maintainer "Thammarath.P"
WORKDIR /nodeTTV
COPY app /nodeTTV
RUN npm install
EXPOSE 9000
CMD ["npm", "start"]