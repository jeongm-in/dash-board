FROM node:16-alpine
WORKDIR /app
COPY ./ ./
RUN npm i
RUN npm run build
EXPOSE 8000
CMD ["node", "backbone/server.js"]