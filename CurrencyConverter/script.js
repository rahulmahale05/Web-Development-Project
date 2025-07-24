// const BASE_URL ="https://api.frankfurter.app/latest?base";
// const url = `https://api.exchangerate-api.com/v4/latest/USD`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const arrow = document.getElementById("arrow");
arrow.style.cursor = "pointer";
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    });
}

arrow.addEventListener("click",()=>{
  let val = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = val;
  updateExchangeRate();
  updateFlag(toCurr);
  updateFlag(fromCurr);
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  let res = fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`)
  .then(response => response.json())
  .then(data => {
    const exchangeRate = data.rates[toCurr.value];
    return exchangeRate;
  })
  .catch(error => console.error('Error fetching exchange rate:', error));
  let rate = await res;

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
