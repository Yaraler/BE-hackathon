FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3000

# Default command (will be overridden in docker-compose)
CMD ["sh", "-c", "npm run dev"]
