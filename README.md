# ExpenseTracker – Aplikacija za spremljanje stroškov

## 1. Idejna zasnova

ExpenseTracker je spletna aplikacija za spremljanje osebnih stroškov. Omogoča dodajanje, pregledovanje, urejanje in brisanje stroškov. Vsak strošek vsebuje naziv, znesek, kategorijo, datum in neobvezen opis.

Trenutno je razvito zaledje z REST API-jem in podatkovno bazo H2. V prihodnje je predvidena izdelava uporabniškega vmesnika, filtriranje stroškov in grafični prikaz porabe.

## 2. Uporabljene tehnologije

- **Java 21 in Spring Boot** – razvoj zalednega sistema.
- **Spring Web MVC** – REST API.
- **Spring Data JPA in Hibernate** – delo s podatkovno bazo.
- **H2** – podatkovna baza v pomnilniku.
- **Maven** – gradnja projekta.
- **Postman** – testiranje CRUD operacij.

## 3. Struktura zaledja

- **Expense** – podatkovni model stroška.
- **ExpenseRepository** – dostop do baze.
- **ExpenseService** – CRUD logika.
- **ExpenseController** – obdelava HTTP zahtevkov.

Podatki so shranjeni v pomnilniku in se ob zaustavitvi aplikacije izgubijo.

## 4. Zagon aplikacije

V mapi `backend` zaženemo:

`.\mvnw.cmd spring-boot:run`

Potreben je JDK 21. API je dostopen na:

`http://localhost:8080/api/expenses`

## 5. CRUD operacije

| Metoda | Endpoint | Opis |
|---|---|---|
| POST | `/api/expenses` | Dodajanje stroška |
| GET | `/api/expenses` | Pridobivanje vseh stroškov |
| GET | `/api/expenses/{id}` | Pridobivanje enega stroška |
| PUT | `/api/expenses/{id}` | Posodobitev stroška |
| DELETE | `/api/expenses/{id}` | Brisanje stroška |

## 6. Testiranje sistema

Delovanje je bilo preverjeno z orodjem Postman.

### 6.1 CREATE – POST

Dodajanje novega stroška. Status: **201 Created**.

![Testiranje POST zahtevka](./screenshots/post.png)

### 6.2 READ – GET vseh stroškov

Pridobivanje vseh zapisov. Status: **200 OK**.

![Testiranje GET vseh stroškov](./screenshots/getAll.png)

### 6.3 READ – GET posameznega stroška

Pridobivanje stroška po ID-ju. Status: **200 OK**.

![Testiranje GET posameznega stroška](./screenshots/get1.png)

### 6.4 UPDATE – PUT

Posodobitev obstoječega stroška. Status: **200 OK**.

![Testiranje PUT zahtevka](./screenshots/put.png)

### 6.5 DELETE – DELETE

Brisanje stroška. Status: **204 No Content**.

![Testiranje DELETE zahtevka](./screenshots/delete.png)

## 7. Zaključek

Izdelano zaledje omogoča vse osnovne CRUD operacije prek REST API-ja. Delovanje je bilo preverjeno s Postmanom.