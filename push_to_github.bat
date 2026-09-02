@echo off
echo ==============================================
echo  Uploading Taiwan Primary Math to GitHub...
echo ==============================================
cd /d "C:\Users\agt09\.gemini\antigravity\scratch\tw-primary-math"
git remote set-url origin https://github.com/georgehuang3213/tw-primary-math.git
git push -u origin main
echo.
echo ==============================================
echo  Done! Now go back to Vercel and click Deploy!
echo ==============================================
pause
