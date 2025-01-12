#!/bin/sh

# Generate Prisma client
npx prisma generate

# Run migrations (опційно, якщо потрібні автоматичні міграції)
npx prisma migrate deploy

# Start the application
npm run start:dev
