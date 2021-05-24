//this solution saves all previous quotes into quotes array 


let quotes = [];

$(document).ready(async () => {
  let currentQuote = await getNewQuoteObject();
  quotes.push(currentQuote);
  $("#previous-quote").prop("disabled", true);
  renderQuote(currentQuote);

  let i = 0;
  $("#new-quote").on("click", async () => {
    $("#previous-quote").prop("disabled", false);
    i++;
    if (!quotes[i]) {
      const newQuote = await getNewQuoteObject();
      quotes.push(newQuote);
      renderQuote(newQuote);
    } else {
      renderQuote(quotes[i]);
    }
  });

  $("#previous-quote").on("click", async () => {
    if (i > 0) {
      i--;
    }
    if (i === 0) {
      $("#previous-quote").prop("disabled", true);
    }
    renderQuote(quotes[i]);
  });
});

const getNewQuoteObject = async () => {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  return data;
};

const renderQuote = ({ content, author }) => {
  const quoteText = `<p>&#10077; ${content} &#10078;</p>`;
  const authorText = `<p>- ${author} </p>`;
  $(".inner-quote").html(quoteText + authorText);

  const availableSpace = $(window).height() - $(".inner-quote").height();
  $(".quote-container").animate(
    { height: $(".inner-quote").height(), "margin-top": availableSpace / 3 },
    250,
    () => {}
  );
  $("#twitter-share").attr("href", formatForUri(content, author));
};

const formatForUri = (text, author) => {
  var plainText = text + "- " + author;
  var encoded =
    "https://twitter.com/intent/tweet?text=" +
    encodeURI(plainText.replace(/&#8217;/g, "'"));
  return encoded;
};
