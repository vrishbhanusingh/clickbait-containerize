##### DEPENDENCIES

FROM --platform= amd64/node:22.2.0-alpine3.20 AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

# COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./
# # Enable Corepack
# RUN corepack enable

# # Install pnpm if specified in packageManager field
# RUN corepack prepare pnpm@latest --activate

# Install dependencies using pnpm
# RUN pnpm install

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### BUILDER

FROM --platform= amd64/node:22.2.0-alpine3.20 AS builder
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ARG CLERK_SECRET_KEY
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_SIGN_IN_URL}
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_SIGN_UP_URL}
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
ARG NEXT_PUBLIC_S3_ACCESS_KEY_ID
ENV NEXT_PUBLIC_S3_ACCESS_KEY_ID=${NEXT_PUBLIC_S3_ACCESS_KEY_ID}
ARG NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
ENV NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=${NEXT_PUBLIC_S3_SECRET_ACCESS_KEY}
ARG NEXT_PUBLIC_S3_BUCKET_NAME
ENV NEXT_PUBLIC_S3_BUCKET_NAME=${NEXT_PUBLIC_S3_BUCKET_NAME}
ARG NEXT_PUBLIC_S3_REGION
ENV NEXT_PUBLIC_S3_REGION=${NEXT_PUBLIC_S3_REGION}
ARG PINECONE_API_KEY
ENV PINECONE_API_KEY=${PINECONE_API_KEY}
ARG OPENAI_API_SECRET_KEY
ENV OPENAI_API_SECRET_KEY=${OPENAI_API_SECRET_KEY}
ARG PINECONE_API_KEY
ENV PINECONE_API_KEY=${PINECONE_API_KEY}
ARG OPENAI_API_SECRET_KEY
ENV OPENAI_API_SECRET_KEY=${OPENAI_API_SECRET_KEY}
ARG SERPER_API_KEY
ENV SERPER_API_KEY=${SERPER_API_KEY}


WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
    elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### RUNNER

FROM --platform= amd64/node:22.2.0-alpine3.20 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static


EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
# CMD ["pnpm","run","dev"]