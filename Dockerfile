FROM node:20.5.1

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio raíz del monorepo
WORKDIR /app

# Copia archivos mínimos primero para aprovechar el cache
COPY pnpm-workspace.yaml ./
COPY apps/admin-api/package.json ./apps/admin-api/
COPY libs/db/package.json ./libs/db/
COPY package.json pnpm-lock.yaml ./

# Instala dependencias con pnpm (y workspaces)
RUN pnpm install

# Copia el resto del código
COPY . .

# Build del paquete compartido @stores-api/db
RUN pnpm --filter @stores-api/db build

# Genera Prisma Client para admin-api
RUN pnpm --filter admin-api prisma generate

# Build del admin-api
RUN pnpm --filter admin-api build

# Cambia al directorio del admin-api
WORKDIR /app/apps/admin-api

# Expone el puerto de la API
EXPOSE 3001

# Inicia el servicio
CMD ["pnpm", "start"]
