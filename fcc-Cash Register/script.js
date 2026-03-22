const cashInput = document.getElementById("cash");
const display = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const currencyUnit = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

document.getElementById("price-screen").innerHTML = `Total: ${price}`;

function checkCashRegister() {
  const cash = parseFloat(cashInput.value);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    display.innerText = "No change due - customer paid with exact cash";
    return;
  }

  if (cash === "") {
    return;
  }

  let change = cash - price;
  change = Math.round(change * 100) / 100;
  const originalChange = change;

  let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0);
  totalCid = Math.round(totalCid * 100) / 100;

  if (totalCid < change) {
    display.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const reversedCid = [...cid].reverse();
  const changeArr = [];

  for (let i = 0; i < reversedCid.length; i++) {
    let [unitName, unitTotal] = reversedCid[i];
    let unitValue = currencyUnit[unitName];
    let amountToReturn = 0;

    while (change >= unitValue && unitTotal > 0) {
      change -= unitValue;
      unitTotal -= unitValue;
      amountToReturn += unitValue;

      change = Math.round(change * 100) / 100;
      unitTotal = Math.round(unitTotal * 100) / 100;
      amountToReturn = Math.round(amountToReturn * 100) / 100;
    }

    if (amountToReturn > 0) {
      changeArr.push([unitName, amountToReturn]);
    }
  }

  if (change > 0) {
    display.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // CLOSED case
  if (totalCid === originalChange) {
    display.innerText =
      "Status: CLOSED " +
      reversedCid
        .filter((c) => c[1] > 0)
        .map((c) => `<br>${c[0]}: $${c[1]}`)
        .join(" ");
    return;
  }

  // OPEN case
  display.innerHTML =
    "Status: OPEN " + changeArr.map((c) => `<br>${c[0]}: $${c[1]}`).join(" ");
}

purchaseBtn.addEventListener("click", checkCashRegister);
