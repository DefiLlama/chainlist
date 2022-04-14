FROM node:14 as builder

WORKDIR /opt/app

COPY . .
RUN yarn
ENV NODE_ENV production
RUN yarn build

FROM node:14

RUN mkdir /mnt/efs

WORKDIR /opt/app
COPY --from=builder /opt/app/.next .next
COPY --from=builder /opt/app/node_modules node_modules
COPY --from=builder /opt/app/package.json package.json
COPY --from=builder /opt/app/yarn.lock yarn.lock
COPY --from=builder /opt/app/public public/static/home
COPY --from=builder /opt/app/.next/static public/static/home/_next/static

EXPOSE 3000

ENV NODE_ENV production

CMD [ "yarn", "start" ]
