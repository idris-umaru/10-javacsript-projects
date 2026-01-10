//Getting the DOM Elements
const form = document.querySelector('.registrationForm');
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail"); 
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("userPhone");
const userAge = document.getElementById("userAge");

//Get the span error input
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const userPhoneError = document.getElementById("phoneError");
const ageError = document.getElementById("ageError");
const successMessage = document.getElementById("sucessMessage");

//validation of name 
function validateUser() {
    const name = userName.value.trim();
    
    if (name === '') {
        showError(userName, nameError, "Name is required");
        return false;
    }

    if (name.length < 3) {
        showError(userName, nameError, "Name must be at least 3 characters");
        return false; // Added return false
    }
    
    const nameRegex = /^[a-zA-Z\s]+$/; // Fixed: added $ at end
    
    if (!nameRegex.test(name)) {
        showError(userName, nameError, "Name can only contain letters and spaces");
        return false;
    }
    
    //After Validation
    showSuccess(userName, nameError);
    return true;
}

//Function To validate Email
function validateEmail() {
    const email = userEmail.value.trim(); // Added .trim()
    
    if (email === '') {
        showError(userEmail, emailError, "Email is required");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(userEmail, emailError, "Please enter a valid email");
        return false;
    }

    showSuccess(userEmail, emailError);
    return true;
}

//function to validate Password
function validatePassword() { 
    const pass = userPassword.value;
    
    if (pass === '') {
        showError(userPassword, passwordError, "Password is required");
        return false;
    }
    
    if (pass.length < 8) {
        showError(userPassword, passwordError, "Password must be at least 8 characters");
        return false;
    }
    
    //Check for uppercase letter 
    if (!/[A-Z]/.test(pass)) {
        showError(userPassword, passwordError, "Password must contain at least one uppercase letter");
        return false;
    }

    //checking for lowercase letter 
    if (!/[a-z]/.test(pass)) {
        showError(userPassword, passwordError, "Password must contain at least one lowercase letter");
        return false;
    }

    //checking for number 
    if (!/[0-9]/.test(pass)) {
        showError(userPassword, passwordError, "Must contain at least one number");
        return false;
    }

    showSuccess(userPassword, passwordError);
    return true;
}

// function to validate confirmPassword 
function validateConfirmPassword() {
    const password = userPassword.value;
    const confirmPass = confirmPassword.value;
    
    if (confirmPass === '') {
        showError(confirmPassword, confirmPasswordError, "Please confirm your password");
        return false;
    }
    
    //  Added actual password comparison
    if (password !== confirmPass) {
        showError(confirmPassword, confirmPasswordError, "Passwords do not match");
        return false;
    }
    
    showSuccess(confirmPassword, confirmPasswordError);
    return true;
}

function validateUserPhone() {
    const phone = userPhone.value.trim();
    
    if (phone === '') {
        showError(userPhone, userPhoneError, "Phone number is required");
        return false;
    }

    // Simplified phone regex for exactly 10 digits
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone)) {
        showError(userPhone, userPhoneError, "Phone number must be exactly 10 digits");
        return false;
    }
    
    showSuccess(userPhone, userPhoneError);
    return true;
}

function validateAge() {
    const usersAge = userAge.value.trim();
    
    if (usersAge === "") {
        showError(userAge, ageError, "Age is required");
        return false;
    }
    
    const ageNum = parseInt(usersAge);

    if (ageNum < 18) {
        showError(userAge, ageError, "You must be at least 18 years old");
        return false;
    }
    
    if (ageNum > 99) {
        showError(userAge, ageError, "Please enter a valid age");
        return false;
    }
    
    showSuccess(userAge, ageError);
    return true;
}

/**
 * Helper functions, reusable Code
 * @param {HTMLElement} input - The input field element
 * @param {HTMLElement} errorElement - The span that shows the error
 * @param {string} message - The error message to display
 */
function showError(input, errorElement, message) {
    input.classList.add("invalid");
    input.classList.remove('valid');
    errorElement.textContent = message;
}

/**
 * @param {HTMLElement} input
 * @param {HTMLElement} errorElement
 */
function showSuccess(input, errorElement) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    errorElement.textContent = '';
}

// Validation when users type
userName.addEventListener('input', validateUser);

userEmail.addEventListener('input', validateEmail);

userPassword.addEventListener('input', () => {
    validatePassword(); 
    
    // If user has typed in confirm password, revalidate it
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

confirmPassword.addEventListener('input', validateConfirmPassword); 
userAge.addEventListener('input', validateAge);
userPhone.addEventListener('input', validateUserPhone);

//To validate the form upon submit 
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Essential so that the page does not reload
    
    // This reruns all validation to check if they're accurate before submitting
    const isNameValid = validateUser();
    const isEmailValid = validateEmail(); // 
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isPhoneValid = validateUserPhone();
    const isAgeValid = validateAge();

    const isFormValid = isNameValid && isEmailValid && isPasswordValid && 
                        isConfirmPasswordValid && isPhoneValid && isAgeValid;

    if (isFormValid) {
        successMessage.classList.remove('hidden');
        successMessage.removeAttribute('hidden'); //  remove hidden attribute that was placed in html 
        
        console.log('✅ Form submitted successfully!');
        console.log('Data:', {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
            phone: userPhone.value,
            age: userAge.value
        });
        
        // setTimeout runs code after a delay (3000ms = 3 seconds)
        setTimeout(() => {
            form.reset();
            
            const allInputs = document.querySelectorAll('input');
            allInputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            
            successMessage.classList.add('hidden');
            successMessage.setAttribute('hidden', '');
        }, 3000);
        
    } else {
        // At least ONE validation failed
        const firstInvalid = document.querySelector('input.invalid');
        
        if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
});