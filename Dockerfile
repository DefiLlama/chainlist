FROM node:14 as builder

WORKDIR /opt/app

COPY . .
RUN yarn
ENV NODE_ENV production
RUN yarn build

ARG STATIC_BUCKET

RUN apt-get update && apt-get install -y awscli

RUN aws s3 cp /opt/app/.next/static s3://${STATIC_BUCKET}/static/bnbchainlist/_next/static --recursive --cache-control "private, max-age=259200" \
  &&  aws s3 cp /opt/app/public s3://${STATIC_BUCKET}/static/bnbchainlist --recursive --cache-control "private, max-age=259200"

FROM node:14

RUN mkdir /mnt/efs

WORKDIR /opt/app
COPY --from=builder /opt/app/.next .next
COPY --from=builder /opt/app/node_modules node_modules
COPY --from=builder /opt/app/package.json package.json
COPY --from=builder /opt/app/yarn.lock yarn.lock

EXPOSE 3000

ENV NODE_ENV production

CMD [ "yarn", "start" ]
