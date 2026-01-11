const markdownInput = document.querySelector("#markdown-input");
const htmlOutput = document.querySelector("#html-output");
const preview = document.querySelector("#preview");

function convertMarkdown() {
  const markdown = markdownInput.value;
  let html = markdown
    .replace(/^###\s+(.*)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.*)$/gm, "<h2>$1</h2>")
    .replace(/^#\s+(.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*|__(.*?)__/g, "<strong>$1$2</strong>")
    .replace(/\*(.*?)\*|_(.*?)_/g, "<em>$1$2</em>")
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/^>\s+(.*)$/gm, "<blockquote>$1</blockquote>");

  preview.innerHTML = html;
  return (htmlOutput.textContent = html);
}

markdownInput.addEventListener("input", convertMarkdown);
