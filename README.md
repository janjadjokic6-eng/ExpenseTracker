
# ExpenseTracker

## 1. O projektu

ExpenseTracker je spletna aplikacija za spremljanje osebnih stroškov.

Namen aplikacije je uporabniku omogočiti enostavno
beleženje, pregledovanje in upravljanje izdatkov.

### Glavne funkcionalnosti

- Dodajanje novih stroškov (CREATE)
- Pregled vseh stroškov (READ)
- Pregled podrobnosti posameznega stroška
- Urejanje obstoječih stroškov (UPDATE)
- Brisanje stroškov (DELETE)
- Dodajanje kategorij
- Prikaz skupnega zneska in števila stroškov
- Iskanje stroškov po nazivu
- Razvrščanje po datumu, znesku ali nazivu
- Naraščajoči in padajoči vrstni red

Aplikacija je sestavljena iz ločenega frontend
in backend dela, ki komunicirata prek REST API-ja.

## 2. Uporabljene tehnologije

### Frontend

- React 19.3.1 – knjižnica za izdelavo uporabniškega vmesnika
- React DOM 19.3.1 – prikaz React komponent v brskalniku
- JavaScript (JSX) – programski jezik
- HTML5 – struktura spletne strani
- CSS3 – oblikovanje uporabniškega vmesnika
- Vite 8.3.4 – razvojno orodje in razvojni strežnik
- Node.js 24.22.0 – izvajalno okolje JavaScript
- npm 11.19.1 – upravljanje paketov
- ESLint 10.13.0 – preverjanje kakovosti kode

### Backend

- Java 21 – programski jezik
- Spring Boot 4.1.1 – ogrodje za razvoj zaledne aplikacije
- Spring Web MVC – izdelava REST API-ja
- Spring Data JPA – dostop do podatkovne baze
- Hibernate – preslikava Java objektov v relacijske tabele
- Spring Validation – podpora za validacijo podatkov
- PostgreSQL JDBC Driver – povezava s podatkovno bazo
- Springdoc OpenAPI 3.1.1 – dokumentacija REST API-ja in Swagger UI
- Maven – upravljanje odvisnosti in gradnja projekta
- Spring Boot Starter Test – podpora za testiranje


### Podatkovna baza

- PostgreSQL
- DataGrip – orodje za pregled podatkovne baze

### Razvojna orodja

- IntelliJ IDEA
- Git in GitHub
- Postman / Swagger UI

Opomba: natančne različice Reacta, Vite in
Node.js ter drugih odvisnosti preverimo v
package.json, pom.xml in razvojnem okolju.

## 3. Struktura projekta

ExpenseTracker/
|
|-- backend/
|   |-- src/
|   |   |-- main/
|   |   |   |-- java/si/feri/backend/
|   |   |   |   |-- controller/
|   |   |   |   |-- dto/
|   |   |   |   |-- model/
|   |   |   |   |-- repository/
|   |   |   |   |-- service/
|   |   |   |   |-- BackendApplication.java
|   |   |   |
|   |   |   |-- resources/
|   |   |       |-- application.properties
|   |   |
|   |   |-- test/
|   |
|   |-- pom.xml
|   |-- mvnw
|
|-- frontend/
|   |-- src/
|   |   |-- App.jsx
|   |   |-- App.css
|   |   |-- api.js
|   |   |-- main.jsx
|   |   |-- index.css
|   |   |-- assets/
|   |
|   |-- public/
|   |-- package.json
|   |-- package-lock.json
|   |-- vite.config.js
|
|-- .gitignore
|-- README.md

### Opis map

- `controller/` – sprejemanje HTTP zahtevkov
- `service/` – poslovna logika aplikacije
- `repository/` – dostop do podatkovne baze
- `model/` – podatkovni modeli oziroma entitete
- `dto/` – objekti za prenos podatkov
- `resources/` – konfiguracija aplikacije
- `frontend/src/` – React komponente in logika
- `frontend/public/` – javne statične datoteke
- `api.js` – komunikacija z REST API-jem

## 4. Navodila za nameščanje in zagon

### Predpogoji

Za zagon aplikacije potrebujemo:

- JDK 21
- Node.js in npm
- PostgreSQL
- Git
- IntelliJ IDEA ali drug urejevalnik kode

### 4.1 Prenos projekta

Projekt prenesemo z GitHub repozitorija:

git clone <URL_REPOZITORIJA>

Nato odpremo mapo ExpenseTracker.

### 4.2 Priprava podatkovne baze

V PostgreSQL ustvarimo podatkovno bazo:

CREATE DATABASE expensetracker;

Podatkovna baza uporablja lokalna vrata 5432.

Backend se poveže z bazo prek JDBC povezave:

jdbc:postgresql://localhost:5432/expensetracker

Tabeli `expense` in `category` Hibernate ustvari
oziroma posodobi na podlagi JPA entitet.

### 4.3 Konfiguracija backenda

V datoteki `application.properties` sta
uporabniško ime in geslo baze nastavljena
z okoljskima spremenljivkama:

spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD:}

Pred zagonom nastavimo okoljski spremenljivki
DB_USER in DB_PASSWORD glede na lokalno
namestitev PostgreSQL.

Gesel in drugih skrivnih podatkov ne
shranjujemo v GitHub repozitorij.

### 4.4 Zagon backenda

V Terminalu odpremo mapo backend:

cd backend

Na macOS ali Linux zaženemo:

./mvnw spring-boot:run

Backend je dostopen na:

http://localhost:8080

REST API:

http://localhost:8080/api/expenses

Swagger UI:

http://localhost:8080/swagger-ui.html

### 4.5 Zagon frontenda

V drugem Terminalu odpremo mapo frontend:

cd frontend

Namestimo odvisnosti:

npm install

Zaženemo razvojni strežnik:

npm run dev

Frontend je običajno dostopen na:

http://localhost:5173

Če so vrata zasedena, lahko Vite uporabi
druga vrata, na primer 5174.

### 4.6 Povezava frontend in backend

Frontend uporablja datoteko `api.js`,
v kateri je določen naslov REST API-ja:

http://localhost:8080/api

Podatki se prenašajo z zahtevki HTTP
(GET, POST, PUT, DELETE) v formatu JSON.

Za pravilno delovanje morajo biti
zagnani PostgreSQL, backend in frontend.

## 5. Navodila za razvijalce

Projekt uporablja Git za spremljanje sprememb
in GitHub za shranjevanje izvorne kode.

### Način dela

1. Pridobimo zadnjo različico kode:

   git pull origin main

2. Ustvarimo novo vejo za funkcionalnost:

   git switch -c feature/nova-funkcionalnost

3. Izvedemo spremembe v kodi.

4. Preverimo delovanje aplikacije.

5. Pripravimo spremembe:

   git add .

6. Ustvarimo commit z opisom spremembe:

   git commit -m "Add new feature"

7. Spremembe pošljemo na GitHub:

   git push -u origin feature/nova-funkcionalnost

8. Na GitHubu ustvarimo Pull Request
   za združitev sprememb v glavno vejo.

### Pravila

- Vsaka funkcionalnost naj ima svojo vejo.
- Commit sporočila naj bodo kratka in jasna.
- Pred združitvijo preverimo delovanje kode.
- Ne objavljamo gesel, žetonov ali datotek .env.
- Sprememb ne združujemo brez pregleda.

## 6. Standardi kodiranja

### Backend – Java

- Razredi uporabljajo PascalCase.
- Metode in spremenljivke uporabljajo camelCase.
- Koda je razdeljena na Controller, Service,
  Repository, Model in DTO sloje.
- Imena razredov in metod naj bodo opisna.
- Poslovno logiko pišemo v Service razrede.
- Uporabljamo ustrezno zamikanje in oblikovanje.

### Frontend – React

- React komponente uporabljajo PascalCase.
- Funkcije in spremenljivke uporabljajo camelCase.
- Za delo s stanjem uporabljamo React Hooks.
- Komunikacija z backendom je v datoteki api.js.
- JSX mora biti pregleden in pravilno zamaknjen.
- Za oblikovanje uporabljamo ločene CSS datoteke.

### Splošna pravila

- Koda naj bo berljiva in razumljiva.
- Imena naj jasno opisujejo namen.
- Izogibamo se nepotrebnemu podvajanju kode.
- Uporabljamo Git za spremljanje sprememb.
- Ob vsaki nadgradnji preverimo delovanje aplikacije.

