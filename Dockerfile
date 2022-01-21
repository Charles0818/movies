FROM node:14  as base

WORKDIR /usr/star_war/
COPY package.json \
    ./
RUN yarn --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

# lint and formatting configs are commented out
# uncomment if you want to add them into the build process

FROM base AS dev
COPY nest-cli.json \ 
    tsconfig.* \ 
    *env \
    # wait-for.sh \
    .eslintrc.js \
    .prettierrc \
    ./
# bring in src from context
COPY ./src/ ./src
RUN npm install

RUN yarn lint
RUN npm run build

# use one of the smallest images possible
FROM node:12-alpine as production
# get package.json from base
COPY --from=base /usr/star_war/ ./
# get the dist back
COPY --from=dev /usr/star_war/dist/ ./dist/
COPY --from=dev /usr/star_war/.env ./.env
# get the node_modules from the intial cache
COPY --from=base /usr/star_war/node_modules/ ./node_modules/

# expose application port 

EXPOSE 5000
# start
CMD   node dist/seeder.js;  node --max-http-header-size 50000 dist/main.js 

