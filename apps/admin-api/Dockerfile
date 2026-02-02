FROM node:20.5.1-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

# Genera Prisma Client
RUN pnpm --filter @stores-api/db generate

# Build de la API
RUN pnpm --filter admin-api build

# ---------- RUN ----------
FROM node:20.5.1-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/libs ./libs
COPY --from=builder /app/apps/admin-api ./apps/admin-api

ENV PORT=8080
EXPOSE 8080

# Usar la ruta del script start
CMD ["node", "apps/admin-api/dist/apps/admin-api/src/index.js"]