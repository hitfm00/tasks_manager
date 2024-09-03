##################
# BUILD BASE IMAGE
##################

FROM node:20-alpine AS base

# Enable corepack and prepare specific version of yarn
RUN corepack enable \
    && corepack prepare yarn@4.4.1 --activate

#############################
# BUILD FOR DEVELOPMENT
#############################

FROM base AS development
WORKDIR /app

# Скопировать package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Установка всех зависимостей
RUN yarn install --immutable

# Копировать весь проект
COPY . .

######################
# BUILD FOR PRODUCTION
######################

FROM base AS production
WORKDIR /app

# Скопировать node_modules из стадии сборки
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist

EXPOSE 5173

# Запуск сервера serve с использованием yarn dlx
CMD ["yarn", "dlx", "serve", "-s", "dist", "-l", "5173"]

