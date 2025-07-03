#!/bin/bash
read -p "Escribe el nombre de la migración: " nombre

if [ -z "$nombre" ]; then
  echo "❌ El nombre de la migración no puede estar vacío."
  exit 1
fi

npx prisma migrate dev --name "$nombre"
