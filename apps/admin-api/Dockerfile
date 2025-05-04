# Usa una imagen base con Node.js y pnpm
FROM node:20.5.1

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del workspace
COPY ../../pnpm-workspace.yaml ./
COPY ../../package.json ../../pnpm-lock.yaml ./
COPY ../../apps/admin-api/package.json ./apps/admin-api/
COPY ../../libs/db/package.json ./libs/db/

# Instala dependencias (solo las necesarias)
RUN pnpm install

# Copia el resto del proyecto (desde root porque el contexto es root)
COPY ../../ .

# Genera el Prisma Client
RUN pnpm --filter @stores-api/db generate

# Compila el código de admin-api
RUN pnpm --filter admin-api build

# Cambia al directorio de admin-api para iniciar
WORKDIR /app/apps/admin-api

# Expón el puerto 3001
EXPOSE 3001

# Comando de inicio
CMD ["pnpm", "start"]
