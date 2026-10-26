param (
    [string]$Message = "Update website content and product catalog"
)

Write-Host "========================================================" -ForegroundColor Green
Write-Host "  VEXPORT GLOBAL EXPORTS - GITHUB SYNC (POWERSHELL)" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Green

Write-Host "`n[1/3] Staging all files..." -ForegroundColor Cyan
git add .

Write-Host "[2/3] Committing with message: '$Message'..." -ForegroundColor Cyan
git commit -m $Message

Write-Host "[3/3] Pushing to GitHub (origin main)..." -ForegroundColor Cyan
git push origin main

Write-Host "`nSUCCESS! Repository is up to date:" -ForegroundColor Green
Write-Host "https://github.com/shanawazvibecode/vexport-website`n" -ForegroundColor Yellow
