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

REM Start Python HTTP server (try python3 first, then python)
python3 -m http.server %PORT%
if errorlevel 1 (
    echo Python3 not found, trying python...
    python -m http.server %PORT%
    if errorlevel 1 (
        echo.
        echo ❌ Python is not installed or http.server module is not available.
        echo Please install Python 3 to run this script.
        pause
        exit /b 1
    )
)

endlocal
