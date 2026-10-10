FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# npm install works with or without a lockfile; npm ci would fail without one
RUN npm install --omit=dev
COPY server.js .
EXPOSE 3000
USER node
CMD ["node", "server.js"]
