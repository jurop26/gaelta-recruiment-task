Zadanie 1.
    1. V admine na Shoptete sa to dá natívne nastaviť v záložke Nastavenia -> Produkty -> Parametre a príznaky -> Príznaky,
        sa dá vztvoriť príznak kde sa nastaví počet dní koľko od vztvorenia sa má flag zobrazovať
    2. 
    3. Nastavime css admin -> Vzhľad a Obsah → Editor → HTML kód -> zahlavie:
        <style>
            .type-category .product .p-bottom.single-button {
                visibility: hidden;
            }
            .type-category .product:hover .p-bottom.single-button {
                visibility: visible;
            }
        </style>

Zadanie 2.
    1.Postup napojenia: 
        - najprv by som vytvoril webhook cez napr. postman cez api: https://api.myshoptet.com/api/webhooks,
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
    1. Musím vyexportovať produkty, objednávky, zákazníkov, vyriešit napojenie dopravcov a importovat do Shopify
    2. 	- Veľkosť obrázkov produktov a bannerov
	    - Rýchlosť načítania skriptov a CSS 
	    - Server response time
    3. Shoptet nemá natívne napr.: 
        - synchronizáciu skladov
        - automatizácie stavou objednávok
        - pre nepodporovanych dopravcov balikobot alebo chameleoon pre tlač štítkov a napojenie dopravcov
        - pre voliteľné sety nie je doplnok, je potrebné custom riešenie

    4. Cena v kategóriach sa dá schovať natívne: Nastavenia → Produkty → Zobrazenie -> Zobrazenie kategórií -> Cena sa zvolí nezobrazovať
    5. Na tlačidlo „Pridať do košíka“ by som nastavil eventListener pridaním scriptu do admin -> editor:
        document.querySelector(".add-to-cart-button").addEventListner("click", () => {
            func....
        })
    6. Použil by som API endpoint /api/eshop pretože všetky informácie sú na jednom mieste cez jeden call: 
    https://api.myshoptet.com/api/eshop?include=orderStatuses,paymentMethods,countries
    7. Na shoptete je možné predávať na viacerých krajinách v jednom admine iba tak, že je možné iba prepnúť jazyk. Nedá sa nastaviť ani rôzna cena, tá sa iba prepočítava podľa aktuálneho kurzu. Ak chce klient 3 FE a 1 admin, možnosťou je vytvoriť 3 samostatné shoptety a spravovať v ERP systéme napr. ODOO alebo vlastné ERP riešenie.

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
                