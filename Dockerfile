# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and workspace configuration files first (including lock files)
COPY package*.json ./

# If you have workspaces defined, copy their package.json files as well 
# (Uncomment the line below if packages are in subdirectories like packages/*)
# COPY packages/*/package.json ./packages/

# Install all dependencies for the monorepo
RUN npm install

# Copy the rest of the project source files into the container
COPY . .

# Build the web application workspace
RUN npm run build --workspace=@rescuebite/web

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application (or use 'npm run start' / 'nginx' depending on your setup)
CMD ["npm", "run", "dev:web"]