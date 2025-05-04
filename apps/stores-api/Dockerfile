FROM node:20.5.1

RUN npm install -g pnpm

WORKDIR /app

# Copia los archivos raíz necesarios del monorepo
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copia los package.json de las apps/libs necesarias
COPY apps/stores-api/package.json ./apps/stores-api/
COPY libs/db/package.json ./libs/db/

# Instala dependencias compartidas
RUN pnpm install

# Copia todo el código del monorepo
COPY . .

# Genera Prisma Client
RUN pnpm --filter @stores-api/db generate

# Compila la app
RUN pnpm --filter stores-api build

# Cambia al directorio de la app
WORKDIR /app/apps/stores-api

EXPOSE 3002

CMD ["pnpm", "start"]
