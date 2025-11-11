#!/usr/bin/env bash
set -e

# .env.production을 런타임 환경변수로 반영 (컨테이너 단독 실행 시)
if [ -f ".env.production" ]; then
  export $(grep -v '^#' .env.production | xargs)
fi

# 마이그레이션 적용
npx prisma migrate deploy

# 앱 시작 (standalone 서버)
node server.js
