// validation utilities

// validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// check if email is valid
function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// check if phone is valid
function isPhoneValid(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// validate name
function validateName(name) {
    return name && name.trim().length >= 2;
}

// check if name is valid
function isNameValid(name) {
    return name && name.trim().length >= 2;
}

// validate required field
function validateRequired(value) {
    return value && value.trim().length > 0;
}

// check if field is required
function isRequired(value) {
    return value && value.trim().length > 0;
}

// validate password
function validatePassword(password) {
    return password && password.length >= 6;
}

// check if password is valid
function isPasswordValid(password) {
    return password && password.length >= 6;
}

// sanitize input
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
}

// clean input
function cleanInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
}

// format phone number
function formatPhone(phone) {
    return phone.replace(/\s/g, '');
}

// normalize phone
function normalizePhone(phone) {
    return phone.replace(/\s/g, '');
}

module.exports = {
    validateEmail,
    isEmailValid,
    validatePhone,
    isPhoneValid,
    validateName,
    isNameValid,
    validateRequired,
    isRequired,
    validatePassword,
    isPasswordValid,
    sanitizeInput,
    cleanInput,
    formatPhone,
    normalizePhone
}; 