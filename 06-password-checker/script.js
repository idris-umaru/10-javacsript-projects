// GET ALL DOM ELEMENTS
const userPassword = document.getElementById('userPassword');
const togglePassword = document.getElementById('toggle-password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// Get all feedback items (requirements list)
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqLowercase = document.getElementById('req-lowercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');
//  FUNCTION TO CHECK PASSWORD STRENGTH

/*
 *Calculate password strength based on criteria
 Returns: { score: 0-5, strength: 'weak'|'fair'|'good'|'strong', feedback: {} }
 */

  function checkPasswordStrength(password) {
    let score = 0;
    const feedback = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    };

    if (password.length >= 8) {
        score++;
        feedback.length = true;
    }

    if (/[A-Z]/.test(password)) {
        score++;
        feedback.uppercase = true;
    }

    if (/[a-z]/.test(password)) {
        score++;
        feedback.lowercase = true;
    }

    if (/[0-9]/.test(password)) {
        score++;
        feedback.number = true;
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        score++;
        feedback.special = true;
    }

    let strength = '';
    if (score === 0) strength = 'none';
    else if (score <= 2) strength = 'weak';
    else if (score === 3) strength = 'fair';
    else if (score === 4) strength = 'good';
    else strength = 'strong';

    return {
        score,
        strength,   
        feedback
    };
}

/**
 * Update the visual indicators (bar, text, checklist)
 */
function updatePasswordStrength(password) {
    if (password === '') {
        strengthBar.className = 'strength-bar';
        strengthText.textContent = 'Enter a password to check strength';
        strengthText.className = 'strength-message';
        resetRequirements();
        return;
    }

    const result = checkPasswordStrength(password);

    // Update strength bar
    strengthBar.className = 'strength-bar'; 
    strengthBar.classList.add(result.strength); 

    // Update strength text
    const strengthMessages = {
        weak: 'Weak - Add more variety',
        fair: 'Fair - Getting better',
        good: 'Good - Almost there',
        strong: 'Strong - Excellent password!'
    };

    strengthText.textContent = strengthMessages[result.strength] || '';
    strengthText.className = `strength-message ${result.strength}`;

    // Update checklist
    updateRequirements(result.feedback);
}
//  UPDATE REQUIREMENTS CHECKLIST


/**
 * Update the checklist items based on what criteria are met
 */
function updateRequirements(feedback) {
    // Length requirement
    if (feedback.length) {
        reqLength.classList.add('valid');
        reqLength.querySelector('.icon').textContent = '✓';
    } else {
        reqLength.classList.remove('valid');
        reqLength.querySelector('.icon').textContent = '✗';
    }
    
    // Uppercase requirement
    if (feedback.uppercase) {
        reqUppercase.classList.add('valid');
        reqUppercase.querySelector('.icon').textContent = '✓';
    } else {
        reqUppercase.classList.remove('valid');
        reqUppercase.querySelector('.icon').textContent = '✗';
    }
    
    // Lowercase requirement
    if (feedback.lowercase) {
        reqLowercase.classList.add('valid');
        reqLowercase.querySelector('.icon').textContent = '✓';
    } else {
        reqLowercase.classList.remove('valid');
        reqLowercase.querySelector('.icon').textContent = '✗';
    }
    
    // Number requirement
    if (feedback.number) {
        reqNumber.classList.add('valid');
        reqNumber.querySelector('.icon').textContent = '✓';
    } else {
        reqNumber.classList.remove('valid');
        reqNumber.querySelector('.icon').textContent = '✗';
    }
    
    // Special character requirement
    if (feedback.special) {
        reqSpecial.classList.add('valid');
        reqSpecial.querySelector('.icon').textContent = '✓';
    } else {
        reqSpecial.classList.remove('valid');
        reqSpecial.querySelector('.icon').textContent = '✗';
    }
}

/**
 * Reset all requirements to invalid state
 */
function resetRequirements(){
    const allRequirements = [reqLength, reqLowercase, reqNumber, reqSpecial, reqUppercase]
    allRequirements.forEach( req =>{
        req.classList.remove('valid')

        const icon = req.querySelector('.icon');
        if (icon) {
            icon.textContent = '×';
        }
    })
}

/**
 * Toggle password visibility when checkbox is clicked
 */
togglePassword.addEventListener('change', () => {
    // Check if checkbox is checked
    if (togglePassword.checked) {
        // Show password as plain text
        userPassword.type = 'text';
    } else {
        // Hide password
        userPassword.type = 'password';
    }
});

/*
 * Check password strength as user types
 */
userPassword.addEventListener('input', () => {
    const password = userPassword.value;
    updatePasswordStrength(password);
});


// Reset everything when page loads
resetRequirements();