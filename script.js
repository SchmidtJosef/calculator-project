// Select elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.square-button');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');

let currentInput = '';
let previousInput = '';
let operator = '';
let shouldResetScreen = false;

// Function to update the display
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Function to append a number or operator to the input
function appendInput(value) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    updateDisplay();
}

// Function to handle operator input
function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Function to clear all inputs
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

// Function to delete the last character
function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

// Function to perform the calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                result = 'Error';
            } else {
                result = prev / curr;
            }
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

// Event listeners for buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (parseFloat(value) >= 0 || value === '.') {
            appendInput(value);
        } else if (value === '=') {
            calculate();
        } else {
            chooseOperator(value);
        }
    });
});

clearButton.addEventListener('click', clearAll);
deleteButton.addEventListener('click', deleteLast);

// Initial display
updateDisplay();
