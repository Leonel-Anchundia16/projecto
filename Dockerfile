FROM node:19.2-alpine3.16 as Build
WORKDIR /app
COPY . .
RUN npm install

FROM node:19.2-alpine3.16 as Deps-Produ
WORKDIR /app
COPY package.json ./
RUN npm install --prod

FROM node:19.2-alpine3.16 as Produccion
WORKDIR /app
COPY --from=Build /app/ ./
COPY --from=Deps-Produ /app/node_modules ./node_modules
ENV NODE_ENV='production'
EXPOSE 3000
CMD ["npm", "run", "start" ]
