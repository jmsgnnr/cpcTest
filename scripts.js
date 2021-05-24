

let lastQuote = null
let currentQuote = {content: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke'}


$(document).ready(async () => {
  $('#previous-quote').prop("disabled",true);
  renderQuote(currentQuote)
  
  $("#new-quote").on('click', async () => {
    $('#previous-quote').prop("disabled",false);
    const newQuote = await getNewQuoteObject()
    renderQuote(newQuote)
    lastQuote = currentQuote
    currentQuote = newQuote
  });

  $("#previous-quote").on('click', async () => {
    $('#previous-quote').prop("disabled",true);
     renderQuote(lastQuote)
  });
});

const getNewQuoteObject = async() => {
  const response = await fetch("https://api.quotable.io/random")
  const data = await response.json()
  return data
}

const renderQuote = ({content, author}) => {
  const quoteText = `<p>&#10077; ${content} &#10078;</p>` 
  const authorText = `<p>- ${author} </p>`
  $(".inner-quote").html(quoteText + authorText);

  const availableSpace = $(window).height()-$(".inner-quote").height();
  $(".quote-container").animate({height:$(".inner-quote").height(),"margin-top":availableSpace/3}, 250, () => {});
  $("#twitter-share").attr("href",formatForUri(content, author));
}

const formatForUri = (text, author) => {
  var plainText = text + "- "+ author;
  var encoded = "https://twitter.com/intent/tweet?text=" + encodeURI(plainText.replace(/&#8217;/g, "'"));
  return encoded;
}
