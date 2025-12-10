#!/bin/bash

# Card Authorization Form - Local Development Server
# This script starts a local web server and opens the application in your default browser

PORT=8080
HOST="localhost"

# Check if port is already in use and find available port
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; do
    echo "⚠️  Port $PORT is already in use. Trying port $((PORT + 1))..."
    PORT=$((PORT + 1))
    if [ $PORT -gt 8090 ]; then
        echo "❌ Could not find an available port between 8080 and 8090."
        exit 1
    fi
done

echo "🚀 Starting Card Authorization Form..."
echo "📦 Server running at http://$HOST:$PORT"
echo "📄 Opening index.html in your browser..."
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Function to open browser based on OS
open_browser() {
    local url=$1
    
    # Wait a moment for server to start
    sleep 2
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open > /dev/null; then
            xdg-open "$url"
        elif command -v gnome-open > /dev/null; then
            gnome-open "$url"
        fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Git Bash or Cygwin on Windows
        start "$url"
    fi
}

# Open browser in background
open_browser "http://$HOST:$PORT/index.html" &

# Start Python HTTP server (try python3, fallback to python)
if command -v python3 > /dev/null 2>&1; then
    python3 -m http.server $PORT
elif command -v python > /dev/null 2>&1; then
    python -m http.server $PORT
else
    echo "❌ Python is not installed. Please install Python 3 to run this script."
    exit 1
fi
