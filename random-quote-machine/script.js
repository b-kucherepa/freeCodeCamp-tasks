let postArray = [];
const bufferMinSize = 15;

async function fetchQuotes() {
  return await fetch("https://dummyjson.com/quotes/random/10", {
    method: "GET",
    mode: "cors",
    type: "json",
    cache: "default",
  })
    .then((response) => response.json())
    .catch((error) =>
      (function (e) {
        throw e;
      })(error)
    );
}

function generateBoxColor(quote, author, isDark) {
  const hue = 10 * ((quote.length + author.length) % 36);
  const lighting = isDark ? "30%" : "70%";
  return `hsl(${hue} 100% ${lighting})`;
}

async function nextQuote() {
  if (postArray.length < bufferMinSize) {
    const newQuotes = await fetchQuotes();
    postArray = [...postArray, ...newQuotes];
  }

  const quote = postArray.shift();
  console.log(quote);
  document.getElementById("text").innerHTML = quote.quote;
  document.getElementById("author").innerHTML = quote.author;

  const isDarkMode = !(
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const newColor = generateBoxColor(quote.quote, quote.author, isDarkMode);
  document.getElementById("quote-box").style.backgroundColor = newColor;
  document.getElementById(
    "quote-box"
  ).style.boxShadow = `0 0 2rem 2rem ${newColor}`;
}

document.addEventListener("load", nextQuote());
