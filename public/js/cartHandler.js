// //GLOBAL CART SYSTEM

function updateCart() {
  //function called to update amount of all items in cart
  let cartAmountParent = window.parent.document.querySelector("#amountInCart");

  if (localStorage.length > 0) {
    let sum = 0;
    for (let i = 0, leng = localStorage.length; i < leng; i++) {
      let key = localStorage.key(i);
      if (key != "lsid" && key != "lastclear" && leng != 1) {
        let val = localStorage.getItem(key);
        let valAll = val.split("*");
        sum += parseInt(valAll[0]);
        if (!isNaN(sum)) {
          cartAmountParent.innerHTML = sum;
        }

        // if (isNaN(sum)) {
        //   cartAmountParent.innerHTML = "0";
        // } else {
        //   cartAmountParent.innerHTML = sum;
        // }
      }
    }
  }
}

let cartState = document.querySelector("#amountInCart");

updateCart(cartState); //global cart update
