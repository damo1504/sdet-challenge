FROM mcr.microsoft.com/playwright:v1.47.0-jammy

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest
RUN npm install

# Copy the rest of the project (tests, configs, etc.)
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "test:ci"]
