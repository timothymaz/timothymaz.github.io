@echo off
echo Building the project...
call npm run build

echo Copying legacy projects and assets...
xcopy /E /I /Y Terminal dist\Terminal
xcopy /E /I /Y XSSSQL dist\XSSSQL
xcopy /E /I /Y images dist\images
copy .nojekyll dist\.nojekyll
echo timothymazur.com > dist\CNAME

echo Deploying to gh-pages branch...
cd dist

git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/timothymaz/timothymaz.github.io.git
git push -f origin gh-pages

cd ..
echo.
echo ======================================
echo Deployment complete!
echo Your site will be live at:
echo https://timothymazur.com
echo in about 1-2 minutes
echo ======================================
pause
