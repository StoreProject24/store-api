FROM node:20.5.1

RUN npm install -g pnpm

WORKDIR /app

# Copiar paquetes y dependencias por separado
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY apps/admin-api/package.json ./apps/admin-api/
COPY libs/db/package.json ./libs/db/

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código
COPY . .

# ✅ Generar Prisma Client usando schema.prisma de libs/db/prisma/
RUN pnpm --filter @stores-api/db generate

# 🏗️ Luego compilar admin-api
RUN pnpm --filter admin-api build

WORKDIR /app/apps/admin-api

EXPOSE 3001

CMD ["pnpm", "start"]
