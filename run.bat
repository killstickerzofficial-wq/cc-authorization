@echo off
REM Card Authorization Form - Local Development Server
REM This script starts a local web server and opens the application in your default browser

setlocal

set PORT=8080
set HOST=localhost

echo.
echo 🚀 Starting Card Authorization Form...
echo 📦 Server will run at http://%HOST%:%PORT%
echo 📄 Opening index.html in your browser...
echo.
echo Press Ctrl+C to stop the server
echo.

REM Wait a moment then open browser
timeout /t 2 /nobreak >nul
start http://%HOST%:%PORT%/index.html

REM Start Python HTTP server
python -m http.server %PORT% 2>nul
if errorlevel 1 (
    python3 -m http.server %PORT%
)

endlocal
