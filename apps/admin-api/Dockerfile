FROM node:20.5.1

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos raíz del monorepo necesarios
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copia los package.json específicos
COPY apps/admin-api/package.json ./apps/admin-api/
COPY libs/db/package.json ./libs/db/

# Instala dependencias
RUN pnpm install

# Copia todo el código del monorepo
COPY . .

# Genera Prisma Client
RUN pnpm --filter @stores-api/db generate

# Compila la app
RUN pnpm --filter admin-api build

# Cambia al directorio de la app
WORKDIR /app/apps/admin-api

# Expone el puerto
EXPOSE 3001

# Comando de arranque
CMD ["pnpm", "start"]

