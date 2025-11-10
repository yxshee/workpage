#!/bin/bash
# Script to resolve node_modules permission issues on macOS

echo "Attempting to fix node_modules permissions..."
echo "Please enter your password if prompted."

# Try to remove the stuck node_modules folder
sudo rm -rf node_modules package-lock.json

# Re-install dependencies using project cache
npm install --cache ./.npm_local_cache

echo "Permissions should be resolved now. Try running 'npm run dev'."
