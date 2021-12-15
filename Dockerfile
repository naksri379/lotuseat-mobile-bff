# Stage 1 - the build process
FROM node:14-alpine as build-deps

WORKDIR /usr/src/app
COPY package.json ./
RUN yarn

COPY . ./

RUN npm run build 

# Stage 2 - the production environment
FROM node:14-alpine AS final

WORKDIR /usr/src/app

# copy from build image
COPY --from=build-deps /usr/src/app/.env ./.env
COPY --from=build-deps /usr/src/app/dist ./dist
COPY --from=build-deps /usr/src/app/package.json ./package.json
COPY --from=build-deps /usr/src/app/node_modules ./node_modules

EXPOSE 4000
CMD ["npm", "run", "start:prod"]