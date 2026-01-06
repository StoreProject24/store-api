# ---------- BUILD ----------
FROM node:20.5.1-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Cache de dependencias
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

COPY apps/stores-api/package.json apps/stores-api/
COPY libs/db/package.json libs/db/

RUN pnpm install --frozen-lockfile

# Código
COPY . .

# Prisma
RUN pnpm --filter @stores-api/db generate

# Build
RUN pnpm --filter stores-api build

# ---------- RUN ----------
FROM node:20.5.1-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/apps/stores-api/dist apps/stores-api/dist
COPY --from=builder /app/apps/stores-api/package.json apps/stores-api/
COPY --from=builder /app/libs/db libs/db

WORKDIR /app/apps/stores-api

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/index.js"]
