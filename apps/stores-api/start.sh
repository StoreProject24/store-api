#!/bin/bash
set -e

echo "========================================="
echo "Starting application with migrations"
echo "========================================="

echo "Step 1: Running database migrations..."
npx prisma migrate deploy --schema=./libs/db/prisma/schema.prisma || {
  echo "Migration failed!"
  exit 1
}

echo "Step 2: Starting application..."
exec pnpm start