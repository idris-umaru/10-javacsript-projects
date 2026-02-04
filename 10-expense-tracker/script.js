document.addEventListener('DOMContentLoaded',()=>{
    console.log("Expense Tracker App Loaded successfully");
});

//Get the DOM Elements 

const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseList = document.querySelector('.expense-list');
const totalExpenseDisplay = document.getElementById('total-expense');
const clearAllBtn = document.getElementById('clear-all-btn');

let expenses = [];

//load expenses from local storage
function loadExpenses(){
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if(savedExpenses){
        expenses = savedExpenses;
        displayExpenses();
        updateTotal();
    }
}

//function to save expenses to local storage 

function saveExpenses (){
    localStorage.setItem('expenses',JSON.stringify(expenses));
}

//Add new Expense 
function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    // Validation
    if (name === '') {
        alert("Please enter a valid expense name");
        expenseNameInput.focus();
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        expenseAmountInput.focus();
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: new Date().toLocaleDateString(),
    };

    // Add to array
    expenses.push(expense);

    // Save to localStorage
    saveExpenses();

    // Clear inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expenseNameInput.focus();

    // Refresh UI
    displayExpenses();    // ← now this will work
    updateTotal();
}

// Delete expense
function deleteExpense(id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses();
        displayExpenses();
        updateTotal();
    }
}

// Clear all expenses
function clearAllExpenses() {
    if (expenses.length === 0) {
        alert('No expenses to clear');
        return;
    }

    if (confirm('Are you sure you want to delete all expenses?')) {
        expenses = [];
        saveExpenses();
        displayExpenses();
        updateTotal();
    }
}
// Display all expenses in the list
function displayExpenses() {
    // Clear the current list
    expenseList.innerHTML = '';

    // If no expenses, show empty message
    if (expenses.length === 0) {
        expenseList.innerHTML = '<p class="empty-message">No expenses yet. Add your first expense above!</p>';
        return;
    }

    // Create HTML for each expense
    expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <div class="expense-info">
                <span class="expense-name">${expense.name}</span>
                <span class="expense-date">${expense.date}</span>
            </div>
            <div class="expense-actions">
                <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        `;
        expenseList.appendChild(expenseItem);
    });
}
// Update total expense
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpenseDisplay.textContent = `$${total.toFixed(2)}`;
}

// Event listeners
addExpenseBtn.addEventListener('click', addExpense);

// Allow Enter key to add expense
expenseNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        expenseAmountInput.focus();
    }
});

expenseAmountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addExpense();
    }
});

clearAllBtn.addEventListener('click', clearAllExpenses);

window.addEventListener('load', loadExpenses);