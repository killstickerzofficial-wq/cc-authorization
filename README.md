# Card Authorization Form

This repository contains a modularized browser-based HTML card authorization form for manual authorization of business transactions.

## Folder Structure

```
.
├── assets/          # Static resources (images, logos)
├── scripts/         # JavaScript files
│   └── app.js      # Main application logic
├── styles/          # CSS stylesheets
│   └── main.css    # Main stylesheet
├── index.html       # Main HTML file
├── run.sh           # Run script for Linux/macOS
└── run.bat          # Run script for Windows
```

## Files

- **index.html** - The main HTML file containing the card authorization form structure
- **styles/main.css** - All styling for the form, including responsive design and print layouts
- **scripts/app.js** - JavaScript for form interactivity, customization, and local storage persistence
- **assets/** - Directory for static resources like company logos
- **run.sh** - Convenience script to start the application on Linux/macOS
- **run.bat** - Convenience script to start the application on Windows

## Features

- **Customizable Branding**: Add your company logo, name, and custom colors
- **Complete Form Fields**: All necessary fields for card authorization
- **Save/Load Functionality**: Save form data to browser local storage
- **Print Support**: Print-friendly layout for physical copies
- **Security Features**: Includes authorization code processing, CVV protection, and more
- **Responsive Design**: Works on desktop and mobile devices
- **Modular Structure**: Separated HTML, CSS, and JavaScript for better maintainability

## Usage

### Quick Start (Recommended)

Use the provided run scripts to automatically start a local web server and open the application in your browser:

**On Linux/macOS:**
```bash
./run.sh
```

**On Windows:**
```bash
run.bat
```

The scripts will:
- Start a local web server on port 8080 (or an alternative if 8080 is busy)
- Automatically open the application in your default browser
- Display the server URL for manual access

### Alternative Methods

**Option 1: Direct Browser Access**
Simply open the `index.html` file directly in any modern web browser. No server required.

**Option 2: Manual Server Start**
```bash
python3 -m http.server 8080
```

Then navigate to `http://localhost:8080/index.html` in your browser.
