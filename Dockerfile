# docker run -p 8080:4000 -e port=4000 ebliq-datasimulation

FROM node:9-alpine as builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm i
COPY ./src ./src
RUN npm run-script build 

FROM node:9-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --production
EXPOSE 8080
CMD ["npm", "run-script", "prod"]