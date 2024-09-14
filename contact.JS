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

// Form Validation
const validatePhone = phone => /^07\d{8}$/.test(phone);
const validatePassword = password => /[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*]/.test(password);
const validateEmail = email => email.includes("@");
const validateUsername = username => /^[A-Z][a-zA-Z]*$/.test(username);

const validateForm = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!username || !email || !dob || !phone || !password) {
        alert("You must fill all input fields.");
        return false;
    }
    if(!validateUsername(username)){
        alert("username only accept letters");
        return false;
    }
    if(!validateEmail(email)){
        alert("must have '@'");
        return false;
    }
    if (!validatePhone(phone)) {
        alert("Phone number must be 10 digits long and start with '07'.");
        return false;
    }

    if (!validatePassword(password)) {
        alert("The password must contain an uppercase letter, a lowercase letter, and a special character.");
        return false;
    }

    return true;
};

// Save to Local or Session Storage
const saveLocal = document.getElementById("inLocal");
const saveSession = document.getElementById("inSession");
const valid = document.getElementById("agreement");

valid.addEventListener("change", () => {
    saveLocal.disabled = !valid.checked;
    saveSession.disabled = !valid.checked;
});

saveLocal.addEventListener("click", () => {
    if (validateForm()) {
        localStorage.setItem('username', document.getElementById('username').value);
        localStorage.setItem('email', document.getElementById('email').value);
        localStorage.setItem('dob', document.getElementById('dob').value);
        localStorage.setItem('phone', document.getElementById('phone').value);
        localStorage.setItem('password', document.getElementById('password').value);
        alert("Data saved to Local Storage.");
    }
});

saveSession.addEventListener("click", () => {
    if (validateForm()) {
        sessionStorage.setItem('username', document.getElementById('username').value);
        sessionStorage.setItem('email', document.getElementById('email').value);
        sessionStorage.setItem('dob', document.getElementById('dob').value);
        sessionStorage.setItem('phone', document.getElementById('phone').value);
        sessionStorage.setItem('password', document.getElementById('password').value);
        alert("Data saved to Session Storage.");
    }
});
