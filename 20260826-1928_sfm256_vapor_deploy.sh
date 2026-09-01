#!/bin/bash
# Zettelkasten ID: 20260826-1928
# Project: sfm256-vapor
# Role: rclone / FTP shell deployment script for VPS demos and changes [cite: 1032]

VPS_HOST="141.148.134.195" # Oracle Cloud OCI VPS Target [cite: 745]
VPS_USER="ubuntu"
REMOTE_PATH="/home/ubuntu/app/packages/sfm256-vapor"
SSH_KEY="~/.ssh/id_ed25519_ocpkit"

echo "🛸 Starting sfm256-vapor Deployment Sync..."

# Compile if needed
if [ -f "package.json" ]; then
    echo "📦 Building project distribution workspace..."
    npm run build --if-present
fi

# Dry-run check for OCI server connectivity [cite: 1032]
ssh -i "$SSH_KEY" -o ConnectTimeout=5 "$VPS_USER@$VPS_HOST" "mkdir -p $REMOTE_PATH"

if [ $? -eq 0 ]; then
    echo "🟢 VPS node reachable. Uploading assets..."
    scp -i "$SSH_KEY" VaporStorefront.tsx vaporState.ts README.md "$VPS_USER@$VPS_HOST:$REMOTE_PATH"
    echo "🚀 Deployment Completed Successfully!"
else
    echo "❌ Deployment Failed. Cannot reach OCI VPS Node."
    exit 1
fi
