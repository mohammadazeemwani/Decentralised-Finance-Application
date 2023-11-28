import { dbank_backend } from "../../declarations/dbank_backend";


window.addEventListener("load", async ()=>{

  update();

});

document.getElementById("myForm").addEventListener('submit',async function(event){
  event.stopImmediatePropagation();
  event.preventDefault();

  const compound_input = parseFloat(document.getElementById("compound-input").value);
  if (isNaN(compound_input)){
    var compound_value = parseFloat(0.002);
  } else {
    var compound_value = parseFloat(compound_input/100);
  }

  console.log(compound_value);

  const button = event.target.querySelector('#submit-btn');

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdraw-amount").value);

  button.setAttribute('disabled', true);

  if (document.getElementById('input-amount').value.length != 0) {
    await dbank_backend.topUp(inputAmount);
  }
  if (document.getElementById('withdraw-amount').value.length != 0) {
    await dbank_backend.withdraw(outputAmount);
  }

  await dbank_backend.compound(compound_value);

  update();

  document.getElementById('input-amount').value = "";
  document.getElementById('withdraw-amount').value = "";
  document.getElementById('compound-input').value = "";

  button.removeAttribute('disabled');

});

document.getElementById("reset-btn").addEventListener('click', async (event)=>{
  event.preventDefault();
  event.stopImmediatePropagation();
  // console.log("RESETTED");

  document.getElementById("reset-btn").setAttribute('disabled', true);
  await dbank_backend.reset_300();
  update();
  document.getElementById("reset-btn").removeAttribute('disabled')

});

async function update(){
  var currentAmount = await dbank_backend.getValue();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
};

document.getElementById("compound-input").addEventListener('mouseenter', (e)=>{
  e.target.setAttribute('placeholder', '');
});
document.getElementById("compound-input").addEventListener('mouseout', (e)=>{
  e.target.setAttribute('placeholder', '0.2');
});



