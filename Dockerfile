# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "src/app.js"]
