const converter = new showdown.Converter({
  emoji: true,
  ghCodeBlocks: true,
  simpleLineBreaks: true,
  smoothLivePreview: true,
  strikethrough: true,
  tables: true,
  tasklists: true,
  underline: true });


function init() {
  convert();
}

function convert() {
  const text = document.getElementById("editor").value;
  const html = converter.makeHtml(text).replace("\u2026", "..."); //replace symbol with actual 3 dots for passing the tests
  const preview = document.getElementById("preview");
  preview.innerHTML = html;
  const codeSnippets = preview.getElementsByTagName("code");
  for (let snippet of codeSnippets) {
    snippet.innerHTML = Prism.highlight(
    snippet.innerText,
    Prism.languages.javascript,
    "javascript");

  }
}

document.addEventListener("load", init());