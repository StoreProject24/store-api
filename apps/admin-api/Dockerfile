FROM node:20.5.1-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

# Prisma + build del lib
RUN pnpm --filter @stores-api/db generate
RUN pnpm --filter @stores-api/db build

# Build de la API
RUN pnpm --filter admin-api build

# ---------- RUN ----------
FROM node:20.5.1-alpine

WORKDIR /app

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/apps/admin-api/dist apps/admin-api/dist
COPY --from=builder /app/libs/db/dist libs/db/dist
COPY --from=builder /app/apps/admin-api/package.json apps/admin-api/

WORKDIR /app/apps/admin-api

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
