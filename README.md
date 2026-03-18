Zadanie 1.

Zadanie 2.
    1.Postup napojenia: 
        - najprv by som vytvoril wennhok cez napr. postman cez api: https://api.myshoptet.com/api/webhooks,
            body: JSON.stringify({
                data: [
                    {
                    event: 'order:create',
                    url: 'https://myapplication.sk/shoptet-webhook'
                    }
                ]
            })
        - vytvoril by som endpoint "/shoptet-webhook", kde by som na zaklade event resolvol podla eventInstance, co je pri evente "order:create" cislo objednavky
        - cez Shoptet Api by som nacital order data a poslal vytvoril riadok v google sheet 
    2. Poslane data: 
                - cislo obj
                - meno
                - email
                - produkty
                - celkova cena
                - paymaent metoda
                - shippping metoda
                - adressa (mena, ulica, mesto......)
                - poznamka
    3. endpoint kod zadanie2.js

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
                