Zadanie 1.

Zadanie 2.

Zadanie 3.
    Upraveny kod je v subore zadanie3.js

    - e.PreventDefault => e.PreventDefault() // chybali zatvorky
    - .val() => .value  // val() je jQuery
    - response.json => response.json() // chybali zatvorky
    - headers: {"Content-type: "application/json"} // chyba headers kedze body je json

Zadanie 4.
    1. Musím vyexportovať produkty, kategórie a varianty
    2. 	- Veľkosť obrázkov produktov a bannerov
	    - Rýchlosť načítania skriptov a CSS 
	    - Server response time
    3. ??
    4. ??
    5. Na tlačidlo „Pridať do košíka“ by som nastavil eventListener pridaním scriptu do admin -> editor:
        document.querySelector(".add-to-cart-button").addEventListner("click", () => {
            func....
        })
    6. použil by som API endpoint /api/eshop pretože všetky informácie sú na jednom mieste cez  jeden call: 
    https://api.myshoptet.com/api/eshop?include=orderStatuses,paymentMethods,countries
    7. ??

Zadanie 5.
    1. Wordpress: nepracoval som s wordpress
    2. Shoptet: 
        - v košiku by som vložil do constanty všetky ceny v zľave: 
            const discounts = document.querySelectorAll("span[data-testid=cartItemDiscount]")
        - potom by som preiteroval produkty v zľave a zobrazil by som požadované upozornenie:
            discounts.forEach(span => {
                const parent = span.parentNode; // alebo span.closest(...)
                // Tu sa dá robiť čokoľvek s parentom, napr. pridat upozornenie
            });
    3. Upgates: nepracoval som s Upgates
                