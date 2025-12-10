// Auto-set today's date
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('datePrepared').valueAsDate = new Date();
    loadFormData(false); // Load any saved data silently on page load
});

function applyCustomizations() {
    const logoUrl = document.getElementById('logoUrl').value.trim();
    const companyName = document.getElementById('companyName').value.trim() || 'Your Company';
    const formTitle = document.getElementById('formTitle').value.trim() || 'Card Authorization Form – Manual Authorization';
    const primaryColor = document.getElementById('primaryColor').value;

    // Update logo
    const logoImg = document.getElementById('customLogo');
    if (logoUrl) {
        logoImg.src = logoUrl;
        logoImg.style.display = 'block';
        logoImg.onerror = function() { this.style.display = 'none'; };
    } else {
        logoImg.style.display = 'none';
    }

    // Update header
    document.getElementById('customTitle').textContent = formTitle;
    document.getElementById('companyDisplay').textContent = companyName;

    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    // Update footer - use textContent to prevent XSS
    document.getElementById('customFooter').textContent = 
        `${companyName}, Member FDIC. Equal Housing Lender. Privacy Policy: www.${companyName.toLowerCase().replace(/\s+/g, '')}.com/privacy. Barcode for Audit. Confidential – Do Not Distribute.`;

    // Update acknowledgment
    const ack = document.getElementById('acknowledgment');
    ack.value = `I/We hereby authorize this transaction for business purposes and confirm compliance with ${companyName}'s terms. This authorization is valid for 24 hours. For questions contact ${companyName} Card Services.`;

    alert('✅ Customizations applied! Preview looks great.');
}

function resetForm() {
    if (confirm('Clear all form data? This cannot be undone.')) {
        document.getElementById('authForm').reset();
        document.getElementById('datePrepared').valueAsDate = new Date();
        localStorage.removeItem('authFormData');
        alert('✅ Form cleared!');
    }
}

function saveFormData() {
    const form = document.getElementById('authForm');
    const data = {};
    
    // Save text inputs, textareas, and dates
    form.querySelectorAll('input[type="text"], input[type="date"], input[type="password"], textarea').forEach(el => {
        if (el.id) data[el.id] = el.value;
    });
    
    // Save checkboxes
    form.querySelectorAll('input[type="checkbox"]').forEach(el => {
        if (el.name) {
            if (!data.checkboxes) data.checkboxes = {};
            data.checkboxes[el.value] = el.checked;
        }
    });
    
    localStorage.setItem('authFormData', JSON.stringify(data));
    alert('✅ Form data saved locally! Use "Load Data" to restore.');
}

function loadFormData(showAlert = true) {
    const saved = localStorage.getItem('authFormData');
    if (saved) {
        const data = JSON.parse(saved);
        
        // Load text inputs, textareas, and dates
        Object.keys(data).forEach(key => {
            if (key !== 'checkboxes') {
                const el = document.getElementById(key);
                if (el) el.value = data[key];
            }
        });
        
        // Load checkboxes
        if (data.checkboxes) {
            Object.keys(data.checkboxes).forEach(value => {
                const el = document.querySelector(`input[type="checkbox"][value="${value}"]`);
                if (el) el.checked = data.checkboxes[value];
            });
        }
        
        if (showAlert) {
            alert('✅ Data loaded from local storage!');
        }
    } else if (showAlert) {
        alert('No saved data found.');
    }
}

// Auto-save on input (optional)
