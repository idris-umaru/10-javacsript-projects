// ============================================
// STEP 1: GET DOM ELEMENTS
// ============================================
const incrementBtn = document.getElementById('increment'); // Fixed: lowercase
const decrementBtn = document.getElementById('decrement'); // Fixed: lowercase
const resetBtn = document.getElementById('reset');
const counterValue = document.getElementById('counterValue');

// ============================================
// STEP 2: INITIALIZE COUNTER
// ============================================
let count = 0;

// ============================================
// STEP 3: FUNCTION TO UPDATE DISPLAY
// ============================================
function updateDisplay() {
    counterValue.textContent = count;
    
    // Add animation effect
    counterValue.classList.add('animate');
    setTimeout(() => {
        counterValue.classList.remove('animate');
    }, 200);
    
    // Change color based on value
    if (count > 0) {
        counterValue.style.color = '#38ef7d'; // Green for positive
    } else if (count < 0) {
        counterValue.style.color = '#eb3349'; // Red for negative
    } else {
        counterValue.style.color = 'white'; // White for zero
    }
}

// ============================================
// STEP 4: INCREMENT FUNCTION
// ============================================
function increment() {
    count++;
    updateDisplay();
}

// ============================================
// STEP 5: DECREMENT FUNCTION
// ============================================
function decrement() {
    count--;
    updateDisplay();
}

// ============================================
// STEP 6: RESET FUNCTION
// ============================================
function reset() {
    count = 0;
    updateDisplay();
}

// ============================================
// STEP 7: EVENT LISTENERS
// ============================================
incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);

// ============================================
// STEP 8: KEYBOARD SHORTCUTS (BONUS)
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        increment();
    } else if (e.key === 'ArrowDown') {
        decrement();
    } else if (e.key === 'r' || e.key === 'R') {
        reset();
    }
});