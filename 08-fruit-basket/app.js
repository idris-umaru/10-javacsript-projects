// Fruit data with emojis
const fruitEmojis = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grape: '🍇',
    strawberry: '🍓',
    watermelon: '🍉'
};

// Get DOM elements
const basket = document.getElementById('basket');
const fruitCountDisplay = document.getElementById('fruit-count');
const clearBasketBtn = document.getElementById('clear-basket');
const addButtons = document.querySelectorAll('.add-btn');

// Basket array to store fruits
let basketFruits = [];

// Function to update fruit count
function updateFruitCount() {
    fruitCountDisplay.textContent = basketFruits.length;
}

// Function to show/hide empty message
function updateEmptyMessage() {
    const emptyMessage = basket.querySelector('.empty-message');
    if (basketFruits.length === 0) {
        if (!emptyMessage) {
            basket.innerHTML = '<p class="empty-message">Your basket is empty. Add some fruits!</p>';
        }
    } else {
        if (emptyMessage) {
            emptyMessage.remove();
        }
    }
}

// Function to add fruit to basket
function addFruitToBasket(fruitName, fruitIcon) {
    // Add to array
    const fruitId = Date.now();
    basketFruits.push({ id: fruitId, name: fruitName, icon: fruitIcon });

    // Create basket item element
    const basketItem = document.createElement('div');
    basketItem.className = 'basket-item';
    basketItem.dataset.id = fruitId;
    basketItem.innerHTML = `
        <div class="basket-item-info">
            <span class="basket-item-icon">${fruitIcon}</span>
            <span class="basket-item-name">${fruitName}</span>
        </div>
        <button class="remove-btn">Remove</button>
    `;

    // Add remove functionality
    const removeBtn = basketItem.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => removeFruitFromBasket(fruitId));

    // Add to basket
    basket.appendChild(basketItem);

    // Update count and empty message
    updateFruitCount();
    updateEmptyMessage();
}

// Function to remove fruit from basket
function removeFruitFromBasket(fruitId) {
    // Remove from array
    basketFruits = basketFruits.filter(fruit => fruit.id !== fruitId);

    // Remove from DOM
    const basketItem = basket.querySelector(`[data-id="${fruitId}"]`);
    if (basketItem) {
        basketItem.remove();
    }

    // Update count and empty message
    updateFruitCount();
    updateEmptyMessage();
}

// Function to clear entire basket
function clearBasket() {
    basketFruits = [];
    basket.innerHTML = '';
    updateFruitCount();
    updateEmptyMessage();
}

// Add event listeners to all Add buttons
addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const fruitItem = e.target.closest('.fruit-item');
        const fruitType = fruitItem.dataset.fruit;
        const fruitName = fruitItem.querySelector('.fruit-name').textContent;
        const fruitIcon = fruitEmojis[fruitType];

        addFruitToBasket(fruitName, fruitIcon);
    });
});

// Add event listener to Clear Basket button
clearBasketBtn.addEventListener('click', clearBasket);

// Initialize empty message on page load
updateEmptyMessage();