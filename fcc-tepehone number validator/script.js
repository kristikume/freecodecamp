const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInp = document.getElementById("user-input");
const result = document.getElementById("results-div");

function checkInput() {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

  if (userInp.value === "") {
    alert("Please provide a phone number");
  }

  const p = document.createElement("p");
  p.classList.add("results-text");
  result.appendChild(p);

  if (regex.test(userInp.value)) {
    p.innerText = `Valid US number: ${userInp.value}`;
    userInp.value = "";
  } else {
    p.innerText = `Invalid US number: ${userInp.value}`;
    userInp.value = "";
  }
}

checkBtn.addEventListener("click", checkInput);

clearBtn.addEventListener("click", () => {
  result.innerHTML = "";
});
