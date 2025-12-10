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
└── index.html       # Main HTML file
```

## Files

- **index.html** - The main HTML file containing the card authorization form structure
- **styles/main.css** - All styling for the form, including responsive design and print layouts
- **scripts/app.js** - JavaScript for form interactivity, customization, and local storage persistence
- **assets/** - Directory for static resources like company logos

## Features

- **Customizable Branding**: Add your company logo, name, and custom colors
- **Complete Form Fields**: All necessary fields for card authorization
- **Save/Load Functionality**: Save non-sensitive form data (never full card number or CVV) to browser local storage
- **Print Support**: Print-friendly layout for physical copies
- **Security Features**: Includes authorization code processing, CVV protection, and more
- **Responsive Design**: Works on desktop and mobile devices
- **Modular Structure**: Separated HTML, CSS, and JavaScript for better maintainability

## Usage

Simply open the `index.html` file in any modern web browser. No additional dependencies or server required.

For local development with a web server:
```bash
python3 -m http.server 8080
```

Then navigate to `http://localhost:8080/index.html` in your browser.
