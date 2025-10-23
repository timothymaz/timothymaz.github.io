#!/bin/bash

echo "Building the project..."
npm run build

echo "Copying legacy projects and assets..."
cp -r Terminal dist/Terminal
cp -r XSSSQL dist/XSSSQL
cp -r images dist/images
cp .nojekyll dist/.nojekyll
echo "timothymazur.com" > dist/CNAME

echo "Deploying to gh-pages branch..."
cd dist

git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/timothymaz/timothymaz.github.io.git
git push -f origin gh-pages

cd ..
echo ""
echo "======================================"
echo "Deployment complete!"
echo "Your site will be live at:"
echo "https://timothymazur.com"
echo "in about 1-2 minutes"
echo "======================================"
