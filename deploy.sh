#!/usr/bin/env sh

# Abort on errors
set -e

# Build the project
echo "Building the project..."
npm run build

# Navigate into the build output directory
cd dist

# Copy CNAME file for custom domain
echo "timothymazur.com" > CNAME

# Copy legacy projects
echo "Copying legacy projects..."
cp -r ../Terminal ./Terminal
cp -r ../XSSSQL ./XSSSQL
cp -r ../images ./images

# Initialize git if needed
if [ ! -d .git ]; then
  git init
  git checkout -b main
fi

# Add all files
git add -A

# Commit changes
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')"

# Force push to gh-pages branch
echo "Deploying to GitHub Pages..."
git push -f git@github.com:timothymaz/timothymaz.github.io.git main:gh-pages

# Go back to project root
cd -

echo "✅ Deployment complete!"
