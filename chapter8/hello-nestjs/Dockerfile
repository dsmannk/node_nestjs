# ─────────── BUILD STAGE ───────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
WORKDIR /app/chapter8/hello-nestjs

# Nest CLI 포함하여 설치
RUN npm install

# 빌드 실행
RUN npm run build

# ─────────── RUN STAGE ───────────
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/chapter8/hello-nestjs/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/chapter8/hello-nestjs/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
