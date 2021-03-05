// ===== intial set up =====

// set a array to store all quotes
let apiQuotes = [];

// DOM selection
const quoteText = document.querySelector('#quote-content');
const authorText = document.querySelector('#author')
const fbShareBtn = document.querySelector('#facebook');
const newQuoteBtn = document.querySelector('#new-quote');


// ===== Show New Quote ======

function newQuote() {
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unkown
    if (!quote.author) {
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = quote.author;
    }
    // check quote length and determine font-size
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = quote.text;

}


// ====== get quote from API ======

async function getQuote() {
    const apiURL = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        return newQuote();
    } catch (error) {
        // catch error
    }
}


// initiate first quote
getQuote();

newQuoteBtn.addEventListener('click', newQuote);



//  ====== share quote to facebook =====

window.fbAsyncInit = function () {
    FB.init({
        appId: '373400220516632',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.7'
    });
};

const shareFaceBook = function () {
    FB.ui({
        display: 'popup',
        method: 'share',
        href: 'https://wei-yiting.github.io/quote-generator/.',
    }, function (response) { });
};

fbShareBtn.addEventListener('click', shareFaceBook);









