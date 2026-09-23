const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "inspirational" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "success" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "wisdom" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "inspirational" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "wisdom" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "success" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers", category: "inspirational" },
    { text: "You learn more from failure than from success.", author: "Unknown", category: "wisdom" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill", category: "success" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "inspirational" }
];

let currentQuoteIndex = 0;
let filteredQuotes = quotes;
let currentCategory = 'all';

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyBtn = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');
const quoteCounter = document.getElementById('quoteCounter');
const totalQuotes = document.getElementById('totalQuotes');

window.addEventListener('load', function() {
    setupEventListeners();
    displayQuote();
});

function setupEventListeners() {
    newQuoteBtn.addEventListener('click', getNewQuote);
    copyBtn.addEventListener('click', copyQuote);
    tweetBtn.addEventListener('click', tweetQuote);
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterByCategory(this.dataset.category);
        });
    });
    
    document.addEventListener('keypress', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            getNewQuote();
        }
    });
}

function filterByCategory(category) {
    currentCategory = category;
    if (category === 'all') {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(q => q.category === category);
    }
    currentQuoteIndex = 0;
    displayQuote();
}

function getNewQuote() {
    currentQuoteIndex = Math.floor(Math.random() * filteredQuotes.length);
    displayQuote();
}

function displayQuote() {
    const quote = filteredQuotes[currentQuoteIndex];
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    quoteCounter.textContent = currentQuoteIndex + 1;
    totalQuotes.textContent = filteredQuotes.length;
}

function copyQuote() {
    const quote = filteredQuotes[currentQuoteIndex];
    const text = `"${quote.text}" — ${quote.author}`;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Quote copied to clipboard!');
    });
}

function tweetQuote() {
    const quote = filteredQuotes[currentQuoteIndex];
    const text = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}