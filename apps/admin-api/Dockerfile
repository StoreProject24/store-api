FROM node:20.5.1-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copiamos todo el repo (simple y seguro)
COPY . .

# Instalamos dependencias
RUN pnpm install --frozen-lockfile

# Prisma
RUN pnpm --filter admin-api generate || true

# Build
RUN pnpm --filter admin-api build

# ---------- RUN ----------
FROM node:20.5.1-alpine

WORKDIR /app

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/apps/admin-api/dist apps/admin-api/dist
COPY --from=builder /app/apps/admin-api/package.json apps/admin-api/

WORKDIR /app/apps/admin-api

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
