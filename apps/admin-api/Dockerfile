# apps/admin-api/Dockerfile

FROM node:20.5.1

# 1. Instalar pnpm globalmente
RUN npm install -g pnpm

# 2. Definir el directorio de trabajo raíz (no el de la app)
WORKDIR /app

# 3. Copiar archivos esenciales del monorepo
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY apps/admin-api/package.json ./apps/admin-api/
COPY libs/db/package.json ./libs/db/

# 4. Instalar solo lo necesario para esta app y su lib
RUN pnpm install

# 5. Copiar todo el código
COPY . .

# 6. Generar el cliente de Prisma desde libs
RUN pnpm --filter @stores-api/db generate

# 7. Compilar la app admin-api
RUN pnpm --filter admin-api build

# 8. Establecer el directorio de trabajo final
WORKDIR /app/apps/admin-api

# 9. Exponer el puerto 3001
EXPOSE 3001

# 10. Comando de arranque
CMD ["pnpm", "start"]
