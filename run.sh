#!/bin/bash

# Card Authorization Form - Local Development Server
# This script starts a local web server and opens the application in your default browser

PORT=8080
HOST="localhost"

# Check if port is already in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port $PORT is already in use. Trying an alternative port..."
    PORT=8081
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        PORT=8082
    fi
fi

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

# Start Python HTTP server
python3 -m http.server $PORT
