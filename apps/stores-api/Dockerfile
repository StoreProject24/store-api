FROM node:22 AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm@10.17.1

COPY . .

RUN pnpm install --frozen-lockfile

# Genera Prisma Client
RUN pnpm --filter @stores-api/db generate

# Build de la API
RUN pnpm --filter stores-api build

# ---------- RUN ----------
FROM node:22

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/libs ./libs
COPY --from=builder /app/apps/stores-api ./apps/stores-api

ENV PORT=8080
EXPOSE 8080

CMD ["./start.sh"]

# Usar la ruta del script start
CMD ["node", "apps/stores-api/dist/apps/stores-api/src/index.js"]