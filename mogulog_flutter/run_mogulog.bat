@echo off
setlocal
chcp 65001 >nul

cd /d "%~dp0"
set "APP_URL=http://localhost:8765"
set "SERVER=%CD%\web_app\server.js"
set "LOG=%CD%\mogulog_run_log.txt"

echo MoguLog web launcher started. > "%LOG%"
echo Project folder: %CD% >> "%LOG%"
echo Web app URL: %APP_URL% >> "%LOG%"

echo.
echo ========================================
echo  MoguLog
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please install Node.js first:
  echo   https://nodejs.org/
  echo.
  echo Node.js was not found. >> "%LOG%"
  pause
  exit /b 1
)

if not exist "%SERVER%" (
  echo web_app\server.js was not found.
  echo Please check this folder:
  echo   %CD%
  echo.
  echo web_app\server.js was not found. >> "%LOG%"
  pause
  exit /b 1
)

echo Starting MoguLog personal web server...
echo A server window will stay open while MoguLog is running.
echo.
echo If Windows Firewall asks, allow access on private networks.
echo This is needed when opening MoguLog from your smartphone on the same Wi-Fi.
echo.

start "MoguLog Server" cmd /k node web_app\server.js
timeout /t 2 /nobreak >nul

echo Opening MoguLog web app on this PC...
start "" "%APP_URL%"

echo.
echo If the app did not open, open this URL manually:
echo   %APP_URL%
echo.
echo To open from your smartphone:
echo   1. Keep the server window open.
echo   2. Connect the phone to the same Wi-Fi as this PC.
echo   3. Check the server window for the http://192.168... address.
echo   4. Open that address in the phone browser.
echo.
echo For Android Flutter development, use:
echo   run_flutter_android.bat
echo.
pause
