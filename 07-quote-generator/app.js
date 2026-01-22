//Getting the Quotes 
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "In the end, we only regret the chances we didn't take.", author: "Lewis Carroll" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" }
];

//Getting the DOM ELEMENTS 
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const shareTwitterBtn = document.getElementById('tweet-quote');

// Logic for random quotes 
const generateQuote = function() {
    const randomIndex= Math.floor(Math.random()* quotes.length)
    const quote = quotes[randomIndex];
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
    quoteText.style.fontSize = '30px'
}

//Function to tweet the current quote

// Function to tweet the current quote
function tweetQuote() {
    const currentQuote = quoteText.textContent;
    const currentAuthor = quoteAuthor.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text="${currentQuote}" - ${currentAuthor}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', generateQuote);
shareTwitterBtn.addEventListener('click', tweetQuote);

// Generate a quote when the page loads
window.addEventListener('load', generateQuote);


