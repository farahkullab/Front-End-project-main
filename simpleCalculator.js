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

        
        // Arrow functions for each mathematical operation
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, b) => Math.pow(a, b);
const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);

// Calculation function
const calculate = (operation) => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    let result;

    if (operation === 'add') result = add(num1, num2);
    else if (operation === 'subtract') result = subtract(num1, num2);
    else if (operation === 'multiply') result = multiply(num1, num2);
    else if (operation === 'divide') result = divide(num1, num2);
    else if (operation === 'power') result = power(num1, num2);
    else if (operation === 'factorial') {
        result = factorial(num1);
        alert("Factorial was calculated only for the first number");
    }

    document.getElementById('result').textContent = result;
};