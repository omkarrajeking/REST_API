# Build 123456789101234123451234123451234561234567812345678
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
