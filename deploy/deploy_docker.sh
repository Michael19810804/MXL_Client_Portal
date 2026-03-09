#!/bin/bash

# Configuration
SERVER_USER="ubuntu"
SERVER_IP="your_server_ip" # Replace with your actual server IP
REMOTE_DIR="/home/ubuntu/mxl-portal"

echo "=== Deploying MXL Client Portal with Docker ==="

# 1. Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "Error: docker-compose.yml not found!"
    exit 1
fi

echo "Step 1: Prepare remote directory..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"

echo "Step 2: Upload project files..."
# We exclude node_modules and .git to speed up upload
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' . $SERVER_USER@$SERVER_IP:$REMOTE_DIR

echo "Step 3: Build and start Docker container on server..."
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    cd ~/mxl-portal
    
    # Check if docker is installed
    if ! command -v docker &> /dev/null; then
        echo "Docker not found. Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
    fi

    # Check if docker-compose is installed (for older versions) or docker compose plugin
    if ! docker compose version &> /dev/null; then
         echo "Docker Compose plugin not found. Please ensure Docker Compose is installed."
    fi

    echo "Building and starting container..."
    # Rebuild image and start container in detached mode
    docker compose up -d --build

    echo "Deployment finished!"
    echo "Portal is running on port 8090"
EOF

echo "=== Deployment Complete! ==="
echo "Please verify by visiting http://$SERVER_IP:8090"
