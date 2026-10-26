@echo off
echo ========================================================
echo   VEXPORT GLOBAL EXPORTS - 1-CLICK GITHUB SYNC
echo ========================================================
echo.

git status --short
echo.
set /p commit_msg="Enter update description (or press Enter for 'Update website content'): "
if "%commit_msg%"=="" set commit_msg=Update website content and product catalog

echo.
echo [1/3] Staging all changed files...
git add .

echo [2/3] Committing changes...
git commit -m "%commit_msg%"

echo [3/3] Pushing to GitHub (main branch)...
git push origin main

echo.
echo ========================================================
echo   SUCCESS! All changes are now live on GitHub:
echo   https://github.com/shanawazvibecode/vexport-website
echo ========================================================
pause
