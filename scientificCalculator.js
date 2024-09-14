
var colorCircles = document.getElementsByClassName('color-circle');
var toggleButton = document.getElementById('toggleButton');
var colorPalette = document.getElementById('colorPalette');

toggleButton.addEventListener('click', () => {
    if (colorPalette.style.display === 'grid') {
        colorPalette.style.display = 'none';
    } else {
        colorPalette.style.display = 'grid';
    }
});


for (let i = 0; i < colorCircles.length; i++) {
    colorCircles[i].addEventListener('click', () => {
        const color = getComputedStyle(colorCircles[i]).backgroundColor;
        document.body.style.backgroundColor = color;
        localStorage.setItem('backgroundColor', color);
    });
}

const savedColor = localStorage.getItem('backgroundColor');
if (savedColor) {
    document.body.style.backgroundColor = savedColor;
}

// Font Selection Handling
const fontSelect = document.getElementById("fontSelect");
fontSelect.addEventListener("change", () => {
    const selectedFont = fontSelect.value;
    document.body.style.fontFamily = selectedFont;
    localStorage.setItem('selectedFont', selectedFont);
});

const savedFont = localStorage.getItem('selectedFont');
if (savedFont) {
    document.body.style.fontFamily = savedFont;
    fontSelect.value = savedFont;
}


let currentNumber = '';
let previousNumber = '';
let operation = null;
let factorialMode = false;

// Append number to current input
const appendNumber = (number) => {
    if (currentNumber === '0') currentNumber = '';
    currentNumber += number;
    updateDisplay();
};

// Toggle negative sign
const toggleNegative = () => {
    if (currentNumber !== '') {
        currentNumber = currentNumber.startsWith('-') ? currentNumber.slice(1) : '-' + currentNumber;
        updateDisplay();
    }
};


// Choose operation
const chooseOperation = (op) => {
    if (op === '-' && currentNumber === '') { 
        // Allow enter negative only once if the current number is empty
        currentNumber = '-';
        updateDisplay();
        return;
    }
    if (currentNumber === '-' && op === '-') {
        // Prevent entering a second negative sign
        return;
    }
    if (currentNumber === '' && op !== '!') return; //other operations if the current number is empty
    if (previousNumber !== '' && operation !== null) {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    factorialMode = false; 
    updateDisplay();
};


// Store factorial operation and calculate immediately
const storeFactorial = () => {
    if (currentNumber !== '') {
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        const result = factorial(Math.abs(parseInt(currentNumber)));
        currentNumber = result.toString();
        previousNumber = '';  // Reset previousNumber
        operation = null;  // Clear any operation
        factorialMode = false;  // Turn off factorial mode
        updateDisplay();  // Update the display with the result
    }
};

// Update the display
const updateDisplay = () => {
    let display = previousNumber;
    if (operation) {
        display += ' ' + operation + ' ';
    }
    display += currentNumber;
    if (factorialMode) {
        display += '!';
    }
    document.getElementById('result').value = display || '0';
};

// Clear the result
const clearResult = () => {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    factorialMode = false;
    updateDisplay();
};

// Perform calculation
const calculate = () => {
    let result;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    if (factorialMode) {
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        result = factorial(Math.abs(parseInt(prev)));
        currentNumber = result.toString();
        operation = null;
        previousNumber = '';
        factorialMode = false;
    } else {
        if (isNaN(prev) || isNaN(curr)) return;

        switch (operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '^':
                result = Math.pow(prev, curr);
                break;
            default:
                return;
        }

        currentNumber = result.toString();
        operation = null;
        previousNumber = '';
    }

    updateDisplay();
};