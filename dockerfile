FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV DATABASE_URL=postgres://docker:docker@consumption-reading-pg:5432/consumptiondb?schema=public

RUN npx prisma generate
RUN npm run build

EXPOSE 3333

CMD ["npm","start"]
