/* Variables globales */
const quoteContainer = document.querySelector('#quote-container');
const newQuote = document.querySelector('#new-quote');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const btnNewQuote = document.querySelector('#new-quote');
const btnTwitter = document.querySelector('#twitter');
const loader = document.querySelector('#loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


/* Conseguir las frases de la API */
async function getQuote(){
    loading();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //si el autor esta vacio, agregar unknown
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //si el qupte es largo aplicar la clase para reducir el tamaño
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-qupte')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quote.innerText = data.quoteText;
    } catch (error) {
        console.log(error);
    }

    complete();
}



function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

//eventos
btnTwitter.addEventListener('click', tweetQuote);
btnNewQuote.addEventListener('click', getQuote);

//load 
getQuote();








