# Build 12345678910123412345123412345123456123456781234567812345123412345612312345
FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
RUN  npm install --only=production

COPY . . 

# Runtime Stage
FROM node:18-alpine as runtime
WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
