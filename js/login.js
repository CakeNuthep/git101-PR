import { i18n } from './translations.js';

// Global App State
let currentLang = 'en';

// DOM Elements
const el = {
    html: document.documentElement,
    titleText: document.getElementById('titleText'),
    userLabel: document.getElementById('userLabel'),
    passLabel: document.getElementById('passLabel'),
    submitBtn: document.getElementById('submitBtn'),
    langBtn: document.getElementById('langBtn'),
    loginForm: document.getElementById('loginForm'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    userError: document.getElementById('userError'),
    passError: document.getElementById('passError')
};

// Update UI Texts based on language state
function renderLanguage() {
    const langData = i18n[currentLang];
    
    el.html.lang = langData.htmlLang;
    el.titleText.innerText = langData.title;
    el.userLabel.innerText = langData.userLabel;
    el.passLabel.innerText = langData.passLabel;
    el.submitBtn.innerText = langData.submitBtn;
    el.langBtn.innerText = langData.langBtn;

    // Refresh active validation messages if any are currently visible
    if (el.username.classList.contains('invalid')) validateFields();
}

// Toggle language event handler
function toggleLanguage() {
    console.log(`Switching language from ${currentLang}...`);
    currentLang = currentLang === 'en' ? 'th' : 'en';
    renderLanguage();
}

// Validation Engine
function validateFields() {
    const langData = i18n[currentLang];
    const emailValue = el.username.value.trim();
    const passValue = el.password.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let isValid = true;

    // Validate Username (Email)
    if (!emailValue) {
        setError(el.username, el.userError, langData.errEmailEmpty);
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        setError(el.username, el.userError, langData.errEmailInvalid);
        isValid = false;
    } else {
        clearError(el.username, el.userError);
    }

    // Validate Password
    if (!passValue) {
        setError(el.password, el.passError, langData.errPassEmpty);
        isValid = false;
    } else if (passValue.length < 6) {
        setError(el.password, el.passError, langData.errPassLength);
        isValid = false;
    } else {
        clearError(el.password, el.passError);
    }

    return isValid;
}

// Helper: Show Input Error
function setError(inputEl, errorEl, message) {
    inputEl.classList.add('invalid');
    errorEl.innerText = message;
}

// Helper: Clear Input Error
function clearError(inputEl, errorEl) {
    inputEl.classList.remove('invalid');
    errorEl.innerText = '';
}

// Form Submission Event
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (validateFields()) {
        alert(i18n[currentLang].alertSuccess);
        console.log('API Request Payload:', {
            username: el.username.value.trim(),
            password: el.password.value
        });
    }
}

// Bind Event Listeners
el.langBtn.addEventListener('click', toggleLanguage);
el.loginForm.addEventListener('submit', handleFormSubmit);

// Real-time error cleanup as user types
el.username.addEventListener('input', () => clearError(el.username, el.userError));
el.password.addEventListener('input', () => clearError(el.password, el.passError));
