# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the root package.json and workspace configuration files
COPY package*.json ./

# Install all dependencies for the monorepo
RUN npm install

# Copy the rest of the project source files into the container
COPY . .

# Build the web application workspace
RUN npm run build --workspace=@rescuebite/web

# Expose the port the app runs on
EXPOSE 3000

# Command to start the development server for the web app
CMD ["npm", "run", "dev:web"]