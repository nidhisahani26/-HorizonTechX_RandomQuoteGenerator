  let allQuotes = [
    {
        text: "Success is not final, failure is not fatal.",
        author: "Winston Churchill",
        category: "Success"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "Motivation"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        category: "Success"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        category: "Life"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "Motivation"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        category: "Wisdom"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "Motivation"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "Success"
    },
    {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt",
        category: "Wisdom"
    },
    {
        text: "Everything you want is on the other side of fear.",
        author: "George Addair",
        category: "Motivation"
    }
];

let currentQuote = null;
let favorites = [];
let selectedCategory = "All";


window.addEventListener("load", function () {

    loadFromStorage();

    setupEventListeners();

    getNewQuote();

});


function setupEventListeners() {

    document
        .getElementById("newQuoteBtn")
        .addEventListener("click", getNewQuote);

    document
        .getElementById("copyBtn")
        .addEventListener("click", copyQuote);

    document
        .getElementById("tweetBtn")
        .addEventListener("click", tweetQuote);

    document
        .getElementById("favBtn")
        .addEventListener("click", toggleFavorite);


    document.querySelectorAll(".category-btn").forEach(function (btn) {

        btn.addEventListener("click", function () {

            document
                .querySelectorAll(".category-btn")
                .forEach(function (button) {
                    button.classList.remove("active");
                });

            this.classList.add("active");

            selectedCategory = this.dataset.cat;

            getNewQuote();

        });

    });

}


function getNewQuote() {

    const filteredQuotes =
        selectedCategory === "All"
            ? allQuotes
            : allQuotes.filter(function (quote) {
                return quote.category === selectedCategory;
            });


    const randomIndex =
        Math.floor(Math.random() * filteredQuotes.length);


    currentQuote = filteredQuotes[randomIndex];

    renderQuote();

}


function renderQuote() {

    const isFavorite =
        favorites.includes(currentQuote.text);


    document.getElementById("quoteText").textContent =
        `"${currentQuote.text}"`;


    document.getElementById("quoteAuthor").textContent =
        `— ${currentQuote.author}`;


    document.getElementById("quoteCat").textContent =
        currentQuote.category;


    const favBtn =
        document.getElementById("favBtn");


    if (isFavorite) {

        favBtn.style.background = "#f5576c";
        favBtn.style.color = "white";
        favBtn.textContent = "❤️ Favorited";

    } else {

        favBtn.style.background = "#e0e0e0";
        favBtn.style.color = "#333";
        favBtn.textContent = "🤍 Favorite";

    }

}


function copyQuote() {

    const text =
        `"${currentQuote.text}" — ${currentQuote.author}`;


    navigator.clipboard.writeText(text)
        .then(function () {

            alert("✅ Copied!");

        });

}


function tweetQuote() {

    const text =
        `"${currentQuote.text}" — ${currentQuote.author} #HorizonTechX`;


    const url =
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;


    window.open(url, "_blank");

}


function toggleFavorite() {

    if (favorites.includes(currentQuote.text)) {

        favorites =
            favorites.filter(function (quote) {
                return quote !== currentQuote.text;
            });

    } else {

        favorites.push(currentQuote.text);

    }


    saveToStorage();

    renderQuote();

}


function saveToStorage() {

    localStorage.setItem(
        "quoteFavorites",
        JSON.stringify(favorites)
    );

}


function loadFromStorage() {

    const saved =
        localStorage.getItem("quoteFavorites");


    if (saved) {

        favorites = JSON.parse(saved);

    }

}
