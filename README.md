
# ExpenseTracker

Spletna aplikacija za spremljanje in upravljanje osebnih stroškov.

## 1. O projektu

ExpenseTracker je spletna aplikacija, ki uporabniku omogoča enostavno beleženje, pregledovanje in upravljanje osebnih izdatkov.

Namen projekta je izboljšati pregled nad porabo denarja in omogočiti organizacijo stroškov po različnih kategorijah.

Aplikacija je razdeljena na dva ločena dela:
- **Frontend:** React uporabniški vmesnik.
- **Backend:** Spring Boot REST API, povezan s podatkovno bazo PostgreSQL.

### Glavne funkcionalnosti

- Dodajanje novih stroškov (CREATE)
- Pregled seznama stroškov (READ)
- Pregled podrobnosti posameznega stroška
- Urejanje stroškov (UPDATE)
- Brisanje stroškov (DELETE)
- Dodajanje kategorij
- Izračun skupnega zneska in števila prikazanih stroškov
- Iskanje stroškov po nazivu
- Razvrščanje stroškov po datumu, znesku ali nazivu
- Naraščajoči in padajoči vrstni red
- Ponastavitev iskalnih kriterijev

## 2. Uporabljene tehnologije

### Frontend

| Tehnologija | Različica | Namen |
|---|---|---|
| React | ^19.3.1 | Izdelava uporabniškega vmesnika |
| React DOM | ^19.3.1 | Prikaz React komponent |
| JavaScript / JSX | ES6+ | Programska logika in komponente |
| HTML5 | - | Struktura spletne strani |
| CSS3 | - | Oblikovanje uporabniškega vmesnika |
| Vite | ^8.3.4 | Razvojni strežnik in gradnja |
| Node.js | 24.22.0 | Izvajalno okolje JavaScript |
| npm | 11.19.1 | Upravljanje paketov |
| ESLint | ^10.13.0 | Preverjanje kakovosti kode |

Različice z znakom `^` so določene v datoteki `frontend/package.json` in predstavljajo dovoljene razpone različic odvisnosti.

### Backend

| Tehnologija | Različica | Namen |
|---|---|---|
| Java | 21 | Programska logika |
| Spring Boot | 4.1.1 | Razvoj zaledne aplikacije |
| Spring Web MVC | Upravljana s Spring Boot | REST API |
| Spring Data JPA | Upravljana s Spring Boot | Dostop do podatkovne baze |
| Hibernate | Upravljana s Spring Boot | Objektno-relacijska preslikava |
| Spring Validation | Upravljana s Spring Boot | Podpora za validacijo |
| Springdoc OpenAPI | 3.1.1 | Dokumentacija in Swagger UI |
| Maven | Maven Wrapper | Gradnja projekta in odvisnosti |
| PostgreSQL JDBC Driver | Upravljana s Spring Boot | Povezava s podatkovno bazo |

### Podatkovna baza

- **PostgreSQL 18.6** – relacijska podatkovna baza
- **DataGrip** – pregled podatkovne baze in izvajanje SQL poizvedb

### Razvojna orodja

- IntelliJ IDEA
- Git
- GitHub
- Swagger UI
- Postman

## 3. Struktura projekta

Projekt je organiziran v dve glavni mapi, `frontend` in `backend`.

```text
ExpenseTracker/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── si/feri/backend/
│   │   │   │       ├── controller/
│   │   │   │       │   ├── ExpenseController.java
│   │   │   │       │   └── CategoryController.java
│   │   │   │       │
│   │   │   │       ├── dto/
│   │   │   │       │   ├── ExpenseRequest.java
│   │   │   │       │   └── ExpenseResponse.java
│   │   │   │       │
│   │   │   │       ├── model/
│   │   │   │       │   ├── Expense.java
│   │   │   │       │   └── Category.java
│   │   │   │       │
│   │   │   │       ├── repository/
│   │   │   │       │   ├── ExpenseRepository.java
│   │   │   │       │   └── CategoryRepository.java
│   │   │   │       │
│   │   │   │       ├── service/
│   │   │   │       │   ├── ExpenseService.java
│   │   │   │       │   └── CategoryService.java
│   │   │   │       │
│   │   │   │       └── BackendApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── .gitignore
└── README.md
```

### Opis pomembnejših map in datotek

| Mapa / datoteka | Opis |
|---|---|
| `backend/` | Zaledni del aplikacije |
| `controller/` | Sprejemanje in obdelava HTTP zahtevkov |
| `service/` | Poslovna logika aplikacije |
| `repository/` | Dostop do podatkovne baze s Spring Data JPA |
| `model/` | Java entitete, povezane s tabelami v bazi |
| `dto/` | Objekti za prenos podatkov |
| `application.properties` | Konfiguracija Spring Boot aplikacije |
| `pom.xml` | Maven odvisnosti in konfiguracija |
| `frontend/` | React uporabniški vmesnik |
| `frontend/src/` | Komponente in programska logika |
| `App.jsx` | Glavna React komponenta |
| `api.js` | Komunikacija s Spring Boot REST API-jem |
| `App.css` | Oblikovanje uporabniškega vmesnika |
| `package.json` | Frontend odvisnosti in skripte |
| `.gitignore` | Datoteke in mape, ki jih Git ne spremlja |
| `README.md` | Dokumentacija projekta |

## 4. Navodila za nameščanje in zagon

### 4.1 Predpogoji

Za lokalni zagon aplikacije potrebujemo:

- JDK 21
- Node.js 24.22.0 in npm 11.19.1 oziroma združljivo okolje
- PostgreSQL 18.6 oziroma združljivo različico
- Maven ali delujoč Maven Wrapper
- Git
- IntelliJ IDEA ali drug urejevalnik kode

### 4.2 Prenos projekta

Na GitHubu odpremo repozitorij ExpenseTracker.

S klikom na **Code → HTTPS** kopiramo povezavo do repozitorija.

V Terminalu izvedemo:

```bash
git clone https://github.com/UPORABNISKO_IME/ExpenseTracker.git
cd ExpenseTracker
```

`UPORABNISKO_IME` zamenjamo z dejanskim GitHub uporabniškim imenom lastnika repozitorija.

### 4.3 Ustvarjanje podatkovne baze

Najprej zaženemo PostgreSQL strežnik.

V programu DataGrip odpremo SQL konzolo, povezano z obstoječo podatkovno bazo `postgres`, ali uporabimo drugo PostgreSQL orodje.

Izvedemo naslednji SQL ukaz:

```sql
CREATE DATABASE expensetracker;
```

S tem ustvarimo podatkovno bazo z imenom `expensetracker`.

Če baza že obstaja, tega ukaza ni treba ponovno izvesti.

#### Podatkovni model

Aplikacija uporablja dve povezani tabeli:

- `category` – kategorije stroškov
- `expense` – posamezni stroški

Tabela `expense` vsebuje tuji ključ `category_id`, ki se sklicuje na kategorijo posameznega stroška.

Povezava med tabelama je **Many-to-One**: več stroškov lahko pripada eni kategoriji.

Tabel ni treba ročno ustvarjati s SQL ukazi, ker jih Hibernate na podlagi JPA entitet ustvari oziroma posodobi ob zagonu aplikacije.

To omogoča nastavitev:

```properties
spring.jpa.hibernate.ddl-auto=update
```

### 4.4 Konfiguracija povezave z bazo

Nastavitve povezave se nahajajo v datoteki:

`backend/src/main/resources/application.properties`

Pomembne nastavitve:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/expensetracker
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD:}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false

server.port=8080
```

Za dostop do baze nastavimo okoljski spremenljivki:

- `DB_USER` – PostgreSQL uporabniško ime
- `DB_PASSWORD` – PostgreSQL geslo

V IntelliJ IDEA odpremo Run Configuration za `BackendApplication` in okoljski spremenljivki nastavimo glede na lokalno namestitev baze.

Prijavnih podatkov ne zapisujemo neposredno v izvorno kodo in jih ne objavljamo na GitHubu.

### 4.5 Zagon backenda

Backend lahko zaženemo v IntelliJ IDEA z zagonom razreda:

`si.feri.backend.BackendApplication`

Alternativno ga zaženemo iz mape `backend` z Mavenom:

```bash
cd backend
mvn spring-boot:run
```

Če je Maven Wrapper pravilno vključen v projekt, lahko namesto tega uporabimo:

```bash
./mvnw spring-boot:run
```

Pri zagonu iz Terminala morata biti okoljski spremenljivki `DB_USER` in `DB_PASSWORD` nastavljeni v okolju tega procesa.

Backend se zažene na naslovu:

http://localhost:8080

REST API:

http://localhost:8080/api/expenses

Swagger UI:

http://localhost:8080/swagger-ui.html

### 4.6 Zagon frontenda

V drugem Terminalu odpremo mapo `frontend`:

```bash
cd frontend
```

Namestimo odvisnosti:

```bash
npm install
```

Zaženemo razvojni strežnik:

```bash
npm run dev
```

Frontend se običajno zažene na naslovu:

http://localhost:5173

Če so vrata 5173 že zasedena, lahko Vite uporabi druga vrata, na primer 5174.

### 4.7 Povezava med frontendom in backendom

Frontend in backend komunicirata prek REST API-ja.

V datoteki `frontend/src/api.js` je določen osnovni naslov:

```javascript
const BASE_URL = "http://localhost:8080/api";
```

Frontend uporablja funkcijo `fetch()` za pošiljanje HTTP zahtevkov.

Uporabljene metode:

| Metoda | Namen |
|---|---|
| GET | Pridobivanje stroškov in kategorij |
| POST | Dodajanje novih zapisov |
| PUT | Posodabljanje stroškov |
| DELETE | Brisanje stroškov |

Podatki se prenašajo v formatu JSON.

Primer iskanja in razvrščanja:

```http
GET /api/expenses?search=kos&sortBy=amount&direction=desc
```

Zahtevek poišče stroške, katerih naziv vsebuje `kos`, in jih razvrsti po znesku od najvišjega do najnižjega.

Za pravilno delovanje aplikacije morajo biti zagnani PostgreSQL, Spring Boot backend in React frontend.

## 5. Navodila za razvijalce

Za spremljanje sprememb uporabljamo Git, za sodelovanje in shranjevanje kode pa GitHub.

### 5.1 Pridobivanje zadnjih sprememb

```bash
git pull origin main
```

### 5.2 Ustvarjanje nove veje

Za novo funkcionalnost ustvarimo ločeno vejo:

```bash
git switch -c feature/nova-funkcionalnost
```

### 5.3 Shranjevanje sprememb

Po spremembah preverimo stanje:

```bash
git status
```

Dodamo spremenjene datoteke:

```bash
git add .
```

Ustvarimo commit:

```bash
git commit -m "Add new functionality"
```

### 5.4 Pošiljanje sprememb na GitHub

```bash
git push -u origin feature/nova-funkcionalnost
```

Na GitHubu lahko nato ustvarimo Pull Request za pregled in združitev sprememb v glavno vejo `main`.

### 5.5 Pravila sodelovanja

- Za nove funkcionalnosti uporabljamo ločene veje.
- Commit sporočila naj bodo kratka in opisna.
- Pred pošiljanjem sprememb preverimo delovanje aplikacije.
- Ne objavljamo gesel, dostopnih žetonov ali datotek `.env`.
- Spremembe pred združitvijo pregledamo.
- Dokumentacijo README posodobimo ob pomembnih spremembah projekta.

## 6. Standardi kodiranja

### 6.1 Backend – Java

- Razredi uporabljajo poimenovanje PascalCase, npr. `ExpenseService`.
- Metode in spremenljivke uporabljajo camelCase, npr. `getAllExpenses`.
- Konstante uporabljajo UPPER_SNAKE_CASE.
- Koda je razdeljena na Controller, Service, Repository, Model in DTO.
- Poslovno logiko pišemo v Service razrede.
- Za REST API uporabljamo ustrezne HTTP metode.
- Imena razredov in metod morajo biti smiselna in razumljiva.

### 6.2 Frontend – React

- React komponente uporabljajo PascalCase, npr. `App`.
- Funkcije in spremenljivke uporabljajo camelCase.
- Za upravljanje stanja uporabljamo React Hooks, npr. `useState`.
- Za pridobivanje podatkov ob nalaganju uporabljamo `useEffect`.
- Kodo za komunikacijo z backendom hranimo v datoteki `api.js`.
- JSX mora biti pravilno strukturiran in zamaknjen.
- Oblikovanje hranimo v ločenih CSS datotekah.
- Za preverjanje kode uporabljamo ESLint.

### 6.3 Splošna pravila

- Uporabljamo dosledno zamikanje in oblikovanje kode.
- Izogibamo se nepotrebnemu podvajanju kode.
- Spremenljivke in funkcije poimenujemo opisno.
- Ob večjih spremembah posodobimo dokumentacijo.
- Pred commitom preverimo, da koda ne vsebuje občutljivih podatkov.
- Za spremljanje različic uporabljamo Git.

## 7. Zaključek

ExpenseTracker omogoča upravljanje osebnih stroškov s pomočjo sodobnih spletnih tehnologij.

Z ločitvijo frontenda in backenda ter uporabo relacijske podatkovne baze je projekt pregledno strukturiran in omogoča nadaljnje nadgradnje.

GitHub repozitorij vsebuje izvorno kodo in dokumentacijo, ki omogočata lažje razumevanje, razvoj in vzdrževanje aplikacije.
