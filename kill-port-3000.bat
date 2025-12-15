@echo off
:: filepath: d:\dataScience\tugas_besar\mlops\Food-Calories-Estimation-Using-Image-Processing-main\kill-port-3000.bat

echo ========================================
echo   Killing Port 3000
echo ========================================
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Found PID: %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo Done! Port 3000 is now free.
echo ========================================
pause