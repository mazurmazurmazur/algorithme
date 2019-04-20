//GLOBAL CART SYSTEM
let cartAmount = document.getElementById("amountInCart");

function updateCart() {
  //function called to update amount of all items in cart
  let cartAmountParent = window.parent.document.querySelector("#amountInCart");

  if (localStorage.length > 0) {
    let sum = 0;
    for (let i = 0, leng = localStorage.length - 1; i < leng; i++) {
      let key = localStorage.key(i);
      let val = localStorage.getItem(key);
      let valAll = val.split("*");
      console.log("valAll = " + valAll);
      sum += parseInt(valAll[0]);
      if (isNaN(sum)) {
        cartAmountParent.innerHTML = "0";
        console.log("option1 happened")
      } else {
        cartAmountParent.innerHTML = sum;
        console.log("option2 happened")
      }
      
     
      
    }
  }
}

let cartState = document.querySelector("#amountInCart");

  updateCart(cartState); //global cart update




