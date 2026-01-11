const form = document.getElementById("form");

//form submit
form.addEventListener("submit", (e) => {
  const result = validateForm();
  if (!isValid(result)) {
    e.preventDefault();
    alert("Please fix the form errors before submitting.");
  }
});

//form "change" event
form.addEventListener("change", (e) => {
  const validate = validateForm();
  const target = e.target;

  //check "other" to display #complaint-description-container
  if (target.id === "other-complaint") {
    const field = document.querySelector("#complaint-description-container");
    if (target.checked) {
      field.style.display = "block";
    } else {
      field.style.display = "none";
    }
  }

  //check "other" to display #solution-description-container
  if (target.closest("#solutions-group")) {
    const otherRadio = document.getElementById("other-solution");
    const field = document.getElementById("solution-description-container");

    // Show if Other is selected, hide otherwise
    if (otherRadio.checked) {
      field.style.display = "block";
    } else {
      field.style.display = "none";
    }
  }

  // ---- Normal inputs & textareas for borderColor ----
  if (target.id) {
    target.style.borderColor = validate[target.id] ? "green" : "red";
  }

  // ---- Complaints (checkbox group) for borderColor ----
  if (target.closest("#complaints-group")) {
    const fieldset = document.querySelector("#complaints-group");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const isChecked = [...checkboxes].some((cb) => cb.checked);
    fieldset.style.borderColor = isChecked ? "green" : "red";
  }

  // ---- Solutions (radio group) for borderColor ----
  if (target.closest("#solutions-group")) {
    const fieldset = document.querySelector("#solutions-group");
    const radios = fieldset.querySelectorAll("input[type='radio']");
    const isChecked = [...radios].some((r) => r.checked);
    fieldset.style.borderColor = isChecked ? "green" : "red";
  }
});

function validateForm() {
  const result = {
    "full-name": false,
    email: false,
    "order-no": false,
    "product-code": false,
    quantity: false,
    "complaints-group": false,
    "complaint-description": false,
    "solutions-group": false,
    "solution-description": false,
  };

  // 1. Full name not empty
  const fullName = document.getElementById("full-name").value.trim();
  result["full-name"] = fullName.length > 0;

  // 2. Valid email format
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  result["email"] = emailRegex.test(email);

  // 3. Order number: 10 digits starting with 2024
  const orderNo = document.getElementById("order-no").value.trim();
  const orderRegex = /^2024\d{6}$/;
  result["order-no"] = orderRegex.test(orderNo);

  // 4. Product code pattern XX##-X###-XX#
  const productCode = document.getElementById("product-code").value.trim();
  const productRegex = /^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$/;
  result["product-code"] = productRegex.test(productCode);

  // 5. Quantity: positive integer
  const quantity = document.getElementById("quantity").value.trim();
  result["quantity"] =
    Number.isInteger(Number(quantity)) && Number(quantity) > 0;

  // 6. At least one complaint checkbox checked
  const complaints = document.querySelectorAll(
    "#complaints-group input[type='checkbox']"
  );
  const complaintCheck = Array.from(complaints).some((cb) => cb.checked);
  result["complaints-group"] = complaintCheck;

  // 7. Complaint description: ≥ 20 chars if Other checked
  const complaintDescription = document
    .getElementById("complaint-description")
    .value.trim();
  const otherComplaint = document.getElementById("other-complaint");
  // if(otherComplaint && otherComplaint.checked){
  //   result["complaint-description"] = complaintDescription.length >= 20;
  // }else{
  //   result["complaint-description"] = true;
  // }
  result["complaint-description"] =
    !otherComplaint?.checked || complaintDescription.length >= 20;

  // 8. One solution radio selected
  const solution = document.querySelectorAll(
    "#solutions-group input[type='radio']"
  );
  const solutionCheck = Array.from(solution).some((r) => r.checked);
  result["solutions-group"] = solutionCheck;

  // 9. Solution description ≥ 20 chars if Other radio selected
  const solutionDescription = document
    .getElementById("solution-description")
    .value.trim();
  const otherSolution = document.getElementById("other-solution");

  result["solution-description"] =
    !otherSolution?.checked || solutionDescription.length >= 20;

  return result;
}

// const result = validateForm();
// console.log(result);

function isValid(obj) {
  return Object.values(obj).every((v) => v === true);
}
// console.log(isValid(validateForm()));
