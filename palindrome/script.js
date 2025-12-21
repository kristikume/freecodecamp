const btn = document.getElementById("check-btn");
const input = document.getElementById("text-input");
const result = document.getElementById("result");

function isPalindrome(str) {
  const alphaNumeric = str.toLowerCase().match(/[a-z0-9]/g);

  //   if (!input.value) {
  //     alert("Please input a value");
  //   }

  return alphaNumeric.join("") === alphaNumeric.reverse().join("");
}

btn.addEventListener("click", () => {
  if (!input.value) {
    alert("Please input a value");
  }

  const message = isPalindrome(input.value)
    ? "is plindrome"
    : "is not palindrome";
  result.classList.remove("hidden");
  result.textContent = `"${input.value}" ${message}`;
  input.value = "";
});
