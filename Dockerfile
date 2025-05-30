# Build 1234567891012341234512341234512345612345678
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
