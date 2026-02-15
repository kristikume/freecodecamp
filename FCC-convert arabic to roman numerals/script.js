const input = document.getElementById("number");
const btn = document.getElementById("convert-btn");
const result = document.getElementById("output");

btn.addEventListener("click", () => {
  //user story 4
  if (input.value === "") {
    result.textContent = "Please enter a valid number";
    result.classList.remove("hidden");
    result.classList.add("alert");

    setTimeout(() => {
      result.textContent = "";
      result.classList.add("hidden");
      result.classList.remove("alert");
    }, 3000);

    return;
  }

  //user story 5
  if (input.value <= 0) {
    setTimeout(() => {
      input.value = "";
      result.textContent = "";
      result.classList.add("hidden");
      result.classList.remove("alert");
    }, 3000);

    result.textContent = "Please enter a number greater than or equal to 1";
    result.classList.remove("hidden");
    result.classList.add("alert");

    return;
  }

  //user story 6
  if (input.value >= 4000) {
    setTimeout(() => {
      input.value = "";
      result.textContent = "";
      result.classList.add("hidden");
      result.classList.remove("alert");
    }, 3000);

    result.textContent = "Please enter a number less than or equal to 3999";
    result.classList.remove("hidden");
    result.classList.add("alert");

    return;
  }

  //user stories 7-11
  result.classList.remove("hidden");
  result.textContent = convertToRoman(input.value);
});

const romanNumerals = [
  "M",
  "CM",
  "D",
  "CD",
  "C",
  "XC",
  "L",
  "XL",
  "X",
  "IX",
  "V",
  "IV",
  "I",
];
const arabicNumerals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
function convertToRoman(num) {
  let output = "";

  for (let i = 0; i < arabicNumerals.length; i++) {
    while (num >= arabicNumerals[i]) {
      output += romanNumerals[i];
      num -= arabicNumerals[i];
    }
  }
  return output;
}

/*

USING RECRUSIVE:

const romanNumerals = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
const arabicNumerals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

function convertToRoman(num, index = 0) {
  // Base case
  if (num === 0) return "";

  // If current value fits
  if (num >= arabicNumerals[index]) {
    return (
      romanNumerals[index] +
      convertToRoman(num - arabicNumerals[index], index)
    );
  }

  // Otherwise move to next numeral
  return convertToRoman(num, index + 1);
}

*/
