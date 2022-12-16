FROM node:14 as modules
WORKDIR /notifications
COPY /package.json ./
RUN npm install --silent

FROM modules as base
COPY /prisma ./prisma
COPY /src ./src
COPY /tsconfig* ./
COPY /nest** ./

FROM base as development
