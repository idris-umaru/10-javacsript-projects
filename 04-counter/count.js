
const incrementBtn = document.getElementById('increment'); 
const decrementBtn = document.getElementById('decrement'); 
const resetBtn = document.getElementById('reset');
const counterValue = document.getElementById('counterValue');

//INITIALIZE COUNTER
let count = 0;

// FUNCTION TO UPDATE DISPLAY 
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

// INCREMENT FUNCTION
function increment() {
    count++;
    updateDisplay();
}

//  DECREMENT FUNCTION
function decrement() {
    count--;
    updateDisplay();
}


//  RESET FUNCTION
function reset() {
    count = 0;
    updateDisplay();
}

//  EVENT LISTENERS

incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);


// KEYBOARD SHORTCUTS 
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        increment();
    } else if (e.key === 'ArrowDown') {
        decrement();
    } else if (e.key === 'r' || e.key === 'R') {
        reset();
    }
});