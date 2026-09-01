#!/bin/bash
# automated meow deployment and cloud synchronization script
# compiles react bundle components and mirrors files to OCI VPS and WebDAV storage

echo "(=^･ω･^=) initiating meow narrative loom sync sequence..."

# strict error handling
set -e

BUILD_DIR="./dist"
REMOTE_VPS="ocpkit:/var/www/meow.artkitty.net/html/narrative-loom/"
RCLONE_TARGET="meow_cloud:backup/published_manifestos"

# build react production package
echo "✨ compiling production React build..."
npm run build

# dry-run verification
if [ ! -d "$BUILD_DIR" ]; then
  echo "😿 error: production build directory not found! build cancelled."
  exit 1
fi

# synchronize to OCI VPS server node via SCP
echo "🚀 rsyncing code to VPS staging directories..."
rsync -avz --delete -e "ssh -i ~/.ssh/ocpkit" $BUILD_DIR/ $REMOTE_VPS

# replicate raw Markdown sources to WebDAV cloud vault
echo "☁️ mirroring Zettelkasten files to WebDAV storage..."
rclone sync ./content/ $RCLONE_TARGET --progress

echo "🎀 deploy complete! cortisol levels stable. we did it! 🎀"
