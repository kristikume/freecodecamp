const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");

const caseInsensitiveFlag = document.querySelector("#i");
const globalFlag = document.querySelector("#g");

//Get flags (returns a string)
function getFlags() {
  let flags = "";

  if (caseInsensitiveFlag.checked) flags += "i";
  if (globalFlag.checked) flags += "g";

  return flags;
}

//Functionality when button is clicked
testButton.addEventListener("click", () => {
  const pattern = regexPattern.value;
  const originalText = stringToTest.textContent;
  const flags = getFlags();

  let regex;
  try {
    regex = new RegExp(pattern, flags);
  } catch {
    testResult.textContent = "no match";
    return;
  }

  const matches = originalText.match(regex);

  if (!matches) {
    testResult.textContent = "no match";
    return;
  }

  // Highlight inside test-string
  stringToTest.innerHTML = originalText.replace(regex, (match) => {
    return `<span class="highlight">${match}</span>`;
  });

  // Show matched text(s) inside result
  const highlightedMatches = matches.map((match) => {
    return `<span class="highlight">${match}</span>`;
  });

  testResult.innerHTML = highlightedMatches.join(", ");
});
