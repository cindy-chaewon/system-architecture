# ========= builder =========
FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NODE_ENV=production
# pnpm 활성화
RUN corepack enable

# 종속성
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Prisma generate (엔진/클라이언트 생성)
COPY prisma ./prisma
RUN pnpm prisma generate

# 앱 소스 복사 & 빌드
COPY . .
# 프로덕션 ENV로 빌드해도 OK (DB 연결은 런타임에 바뀜)
ARG NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ========= runner =========
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

# 런타임 파일 복사
# standalone + static + public + prisma + node_modules (prisma CLI 포함용)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# 엔트리포인트 스크립트
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
CMD ["/entrypoint.sh"]
