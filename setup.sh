#!/bin/bash

echo "====================="
echo " Marvel Movies App Setup"
echo "====================="

# Flags
INSTALL_DEPS=false

# Check for `--install-deps` flag
if [[ "$1" == "--install-deps" ]]; then
  INSTALL_DEPS=true
  echo "Dependency installation is enabled."
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js (>= 18) and try again."
  exit 1
fi

NODE_VERSION=$(node -v)
echo "✔ Node.js version $NODE_VERSION found."

# Check for npm
if ! command -v npm &> /dev/null; then
  echo "❌ npm is not installed. Please install npm (>= 8) and try again."
  exit 1
fi

NPM_VERSION=$(npm -v)
echo "✔ npm version $NPM_VERSION found."

# Set up .env files if they don't exist
echo "Checking .env files..."

# Server .env
SERVER_ENV="./server/.env"
if [[ -f "$SERVER_ENV" ]]; then
  echo "✔ Server .env file already exists at $SERVER_ENV."
else
  echo "TMDB_API_KEY is required to fetch data."
  read -p "Enter your TMDB API Key: " TMDB_API_KEY
  if [[ -z "$TMDB_API_KEY" ]]; then
    echo "❌ TMDB API Key is required. Please provide it and try again."
    exit 1
  fi
  echo "TMDB_API_KEY=$TMDB_API_KEY" > $SERVER_ENV
  echo "PORT=5000" >> $SERVER_ENV
  echo "✔ Created .env file for the server at $SERVER_ENV."
fi

# Client .env files
CLIENT_ENV_DEV="./client/.env.development"
CLIENT_ENV_PROD="./client/.env.production"

if [[ -f "$CLIENT_ENV_DEV" ]]; then
  echo "✔ Client .env.development file already exists at $CLIENT_ENV_DEV."
else
  echo "REACT_APP_SERVER_URL=http://localhost:5000" > $CLIENT_ENV_DEV
  echo "✔ Created .env.development file for the client at $CLIENT_ENV_DEV."
fi

if [[ -f "$CLIENT_ENV_PROD" ]]; then
  echo "✔ Client .env.production file already exists at $CLIENT_ENV_PROD."
else
  echo "REACT_APP_SERVER_URL=http://localhost:5000" > $CLIENT_ENV_PROD
  echo "✔ Created .env.production file for the client at $CLIENT_ENV_PROD."
fi

# Install dependencies if the flag is provided
if $INSTALL_DEPS; then
  echo "Installing dependencies for the project..."
  npm run install:all

  if [[ $? -ne 0 ]]; then
    echo "❌ Failed to install dependencies. Please check for errors above."
    exit 1
  fi
  echo "✔ Dependencies installed successfully."
else
  echo "Skipping dependency installation. Use './setup.sh --install-deps' to install dependencies."
fi

# Final message
echo "====================="
echo " Setup Complete"
echo "====================="
