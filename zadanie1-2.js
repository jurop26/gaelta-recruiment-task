document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("type-category")) {
    return;
  }

  const products = document.querySelectorAll("#products div[data-micro-price]");

  products.forEach((p) => {
    const price = p.getAttribute("data-micro-price");

    if (price < 50) {
      const div = document.createElement("div");
      div.innerText = "🚚 Doprava zadarmo nad 50 €";

      p.querySelector(".price-final").append(div);
    }
  });
});
