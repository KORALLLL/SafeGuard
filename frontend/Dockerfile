# Используем Node.js для сборки
FROM node:18 AS build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей и устанавливаем зависимости
COPY package.json yarn.lock ./
RUN yarn install

# Копируем исходный код
COPY . .
RUN yarn add @types/axios --dev
# Сборка приложения
RUN yarn build

# Используем Nginx для сервера
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копируем конфигурационный файл Nginx, если требуется
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]