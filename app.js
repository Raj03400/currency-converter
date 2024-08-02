const Base_URL = `https://v6.exchangerate-api.com/v6/b62597a5246f3c6f74cf9017/latest`;

const dropdown = document.querySelectorAll(".dropdown select")
const currfrom = document.querySelector(".from select")
const currto = document.querySelector(".to select")
const btn = document.getElementById("btn")
const finalResult = document.getElementById("ToAmt") 


for(let select of dropdown){
for(let currCode in countryList){
  let newOption = document.createElement("option")
  newOption.innerText = currCode
  newOption.value=currCode
  if(select.name === "from" && currCode==="USD"){
newOption.selected = "selected"
  }
  else if(select.name === "to" && currCode==="PKR"){
    newOption.selected = "selected"
  }
  select.append(newOption)
}
select.addEventListener("change", (evt)=>{
  updateFlag(evt.target)
});
}

const updateFlag=(element)=>{
let currCode = element.value
let countryCode= countryList[currCode]
let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`
let img = element.parentElement.querySelector("img")
img.src= newSrc
}


const updateExg = async ()=>{
const amount = document.querySelector(".from input")
let amtval = amount.value
amtval=parseInt(amtval)
if(isNaN(amtval) || amtval === "" || amtval<1){
  amount.value="1"
  amtval=1
}
const url = `${Base_URL}/${currfrom.value}`
let response = await fetch(url)
let data = await response.json()
console.log(data);
let rate = data.conversion_rates[currto.value]
let finalrate = amtval * rate
finalResult.value = finalrate
}

btn.addEventListener("click", (e)=>{
e.preventDefault();
updateExg();

})