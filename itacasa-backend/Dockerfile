FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
# Copy Prisma schema
COPY ./prisma/schema.prisma ./prisma/schema.prisma

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client code
RUN npx prisma

RUN npx prisma generate

RUN find . -type f -name "*.dto.ts" -exec sed -i 's:../../../node_modules/.:@:g' {} +

RUN npm run build

FROM node:23-alpine

WORKDIR /app
# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./.env

EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:migrate:prod" ]
