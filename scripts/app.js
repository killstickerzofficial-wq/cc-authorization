// Sanitize user input to prevent XSS attacks
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Validate form inputs
function validateForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('card-form');
    const cardholderName = document.getElementById('cardholder-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const cvv = document.getElementById('cvv').value;
    const amount = document.getElementById('amount').value;
    const expiryMonth = document.getElementById('expiry-month').value;
    const expiryYear = document.getElementById('expiry-year').value;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    
    let isValid = true;
    
    // Validate cardholder name
    if (cardholderName.trim().length < 3) {
        document.getElementById('name-error').classList.add('show');
        isValid = false;
    }
    
    // Validate card number
    if (!/^[0-9]{16}$/.test(cardNumber)) {
        document.getElementById('card-error').classList.add('show');
        isValid = false;
    }
    
    // Validate expiry date
    if (!expiryMonth || !expiryYear) {
        isValid = false;
    } else {
        // Check if card is expired
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const selectedYear = parseInt(expiryYear);
        const selectedMonth = parseInt(expiryMonth);
        
        if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
            alert('Card has expired. Please use a valid card.');
            isValid = false;
        }
    }
    
    // Validate CVV
    if (!/^[0-9]{3,4}$/.test(cvv)) {
        document.getElementById('cvv-error').classList.add('show');
        isValid = false;
    }
    
    // Validate amount
    if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
        document.getElementById('amount-error').classList.add('show');
        isValid = false;
    }
    
    if (isValid) {
        addTransaction(cardholderName, cardNumber, amount);
        form.reset();
        alert('Transaction authorized successfully!');
    }
    
    return false;
}

// Add transaction to the list
function addTransaction(name, cardNumber, amount) {
    const transactionList = document.getElementById('transaction-list');
    const emptyMessage = document.getElementById('transaction-empty');
    
    // Hide empty message if it exists
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    const li = document.createElement('li');
    const maskedCard = '**** **** **** ' + cardNumber.slice(-4);
    const date = new Date().toLocaleString();
    
    // Sanitize user inputs before displaying
    const sanitizedName = sanitizeInput(name);
    const sanitizedAmount = parseFloat(amount).toFixed(2);
    
    li.innerHTML = '<strong>' + sanitizedName + '</strong><br>' +
                  'Card: ' + maskedCard + '<br>' +
                  'Amount: $' + sanitizedAmount + '<br>' +
                  'Date: ' + date;
    
    transactionList.insertBefore(li, transactionList.firstChild);
}

// Print form
function printForm() {
    window.print();
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    const form = document.getElementById('card-form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
    
    // Print button
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', printForm);
    }
    
    // Add custom validation messages
    const cardholderInput = document.getElementById('cardholder-name');
    if (cardholderInput) {
        cardholderInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            if (this.validity.valueMissing) {
                document.getElementById('name-error').textContent = 'Please enter cardholder name';
                document.getElementById('name-error').classList.add('show');
            }
        });
    }
    
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            if (this.validity.valueMissing) {
                document.getElementById('card-error').textContent = 'Please enter card number';
                document.getElementById('card-error').classList.add('show');
            } else if (this.validity.patternMismatch) {
                document.getElementById('card-error').textContent = 'Please enter a valid 16-digit card number';
                document.getElementById('card-error').classList.add('show');
            }
        });
    }
    
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            if (this.validity.valueMissing) {
                document.getElementById('cvv-error').textContent = 'Please enter CVV';
                document.getElementById('cvv-error').classList.add('show');
            } else if (this.validity.patternMismatch) {
                document.getElementById('cvv-error').textContent = 'Please enter a valid 3 or 4 digit CVV';
                document.getElementById('cvv-error').classList.add('show');
            }
        });
    }
    
    const amountInput = document.getElementById('amount');
    if (amountInput) {
        amountInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            if (this.validity.valueMissing) {
                document.getElementById('amount-error').textContent = 'Please enter amount';
                document.getElementById('amount-error').classList.add('show');
            } else if (this.validity.rangeUnderflow) {
                document.getElementById('amount-error').textContent = 'Amount must be greater than 0';
                document.getElementById('amount-error').classList.add('show');
            }
        });
    }
    
    // Clear error messages on input
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorId = this.id.replace(/^(cardholder-name|card-number|cvv|amount)$/, '$1') + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    });
});
