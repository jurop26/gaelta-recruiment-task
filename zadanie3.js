document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtns = document.querySelectorAll(".btn-add-to-cart");

  addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault(); // chybali zatvorky e.preventDefault

      const productId = btn.getAttribute("data-product");
      const quantity = document.querySelector("#qty-" + productId).value; // .val() bol jQuery

      fetch("/api/cart/add", {
        headers: {
          // chybal headers pre application/json kedze body je json
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          product_id: productId,
          qty: quantity,
        }),
      })
        .then((response) => response.json()) // chybali zatvorky .json
        .then((data) => {
          console.log("Pridané do košíka", data);
        });
    });
  });
});
