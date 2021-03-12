// ===== intial set up =====

// set a array to store all quotes
let apiQuotes = [];

// DOM selection
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote-content');
const authorText = document.querySelector('#author')
const fbShareBtn = document.querySelector('#facebook');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}

// Hide Loading
function completeLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// ===== Show New Quote ======

function newQuote() {
    loading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unkown
    if (!quote.author) {
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = `- ${quote.author}`;
    }
    // check quote length and determine font-size
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.innerText = quote.text;
    completeLoading();
}


// ====== get quote from API ======

async function getQuote() {
    loading();
    const apiURL = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        return newQuote();
    } catch (error) {
        // catch error Here
    }
}


// initiate first quote
getQuote();


// event listener
newQuoteBtn.addEventListener('click', newQuote);
fbShareBtn.addEventListener('click', shareFaceBook);


//  ====== share quote to facebook =====

window.fbAsyncInit = function () {
    FB.init({
        appId: '373400220516632',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
    });
};

const shareFaceBook = function () {
    FB.ui({
        display: 'popup',
        method: 'share',
        href: 'https://wei-yiting.github.io/quote-generator/.',
        quote: `${quoteText.innerText} \n- ${authorText.innerText}`,
    }, function (response) { });
};
