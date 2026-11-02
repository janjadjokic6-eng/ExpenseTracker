
import { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";

function today() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function emptyForm() {
  return {
    title: "",
    amount: "",
    categoryId: "",
    date: today(),
    description: ""
  };
}

function App() {

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [newCategory, setNewCategory] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Novi funkcionalnosti: iskanje in razvrscanje

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [direction, setDirection] = useState("desc");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    sortBy: "date",
    direction: "desc"
  });

  // Nalaganje podatkov ob odprtju aplikacije

  useEffect(() => {

    async function loadData() {

      try {

        const [expenseData, categoryData] = await Promise.all([
          api.getExpenses(),
          api.getCategories()
        ]);

        setExpenses(expenseData);
        setCategories(categoryData);

        if (categoryData.length > 0) {
          setForm(previous => ({
            ...previous,
            categoryId: String(categoryData[0].id)
          }));
        }

      } catch (err) {

        setError(
            "Napaka pri nalaganju podatkov: " + err.message
        );

      } finally {

        setLoading(false);

      }
    }

    loadData();

  }, []);

  // Ponovno nalaganje stroskov

  async function refreshExpenses(filters = appliedFilters) {

    const data = await api.getExpenses(
        filters.search,
        filters.sortBy,
        filters.direction
    );

    setExpenses(data);
  }

  // Ponastavitev obrazca

  function resetForm() {

    setForm({
      ...emptyForm(),
      categoryId: String(categories[0]?.id ?? "")
    });

    setEditingId(null);
  }

  // Statistika

  const total = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
  );

  // Sprememba podatkov v obrazcu

  function handleChange(event) {

    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  }

  // CREATE in UPDATE stroska

  async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setMessage("");

    const amount = Number(form.amount);

    if (
        !form.title.trim() ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        !form.categoryId ||
        !form.date
    ) {
      setError("Vnesi veljavne podatke.");
      return;
    }

    const data = {
      title: form.title.trim(),
      amount: amount,
      categoryId: Number(form.categoryId),
      date: form.date,
      description: form.description
    };

    setSaving(true);

    try {

      if (editingId !== null) {

        await api.updateExpense(editingId, data);
        setMessage("Strošek je bil posodobljen.");

      } else {

        await api.createExpense(data);
        setMessage("Strošek je bil dodan.");

      }

      await refreshExpenses();

      resetForm();
      setSelectedExpense(null);

    } catch (err) {

      setError(
          "Napaka pri shranjevanju: " + err.message
      );

    } finally {

      setSaving(false);

    }
  }

  // Priprava obrazca za urejanje

  function handleEdit(expense) {

    setForm({
      title: expense.title,
      amount: String(expense.amount),
      categoryId: String(expense.categoryId),
      date: expense.date,
      description: expense.description || ""
    });

    setEditingId(expense.id);
    setSelectedExpense(null);

    setError("");
    setMessage("");
  }

  // DELETE stroska

  async function handleDelete(id) {

    if (!window.confirm("Ali želiš izbrisati ta strošek?")) {
      return;
    }

    setError("");
    setMessage("");

    try {

      await api.deleteExpense(id);
      await refreshExpenses();

      if (selectedExpense?.id === id) {
        setSelectedExpense(null);
      }

      if (editingId === id) {
        resetForm();
      }

      setMessage("Strošek je bil izbrisan.");

    } catch (err) {

      setError(
          "Napaka pri brisanju: " + err.message
      );

    }
  }

  // GET posameznega stroska

  async function handleDetails(id) {

    setError("");

    try {

      const expense = await api.getExpense(id);

      setSelectedExpense(expense);

    } catch (err) {

      setError(
          "Napaka pri pridobivanju stroška: " + err.message
      );

    }
  }

  // Dodajanje nove kategorije

  async function handleAddCategory(event) {

    event.preventDefault();

    const name = newCategory.trim();

    if (!name) {
      setError("Vnesi ime kategorije.");
      return;
    }

    setError("");
    setMessage("");

    try {

      const created = await api.createCategory(name);

      const categoryData = await api.getCategories();

      setCategories(categoryData);

      setForm(previous => ({
        ...previous,
        categoryId: String(created.id)
      }));

      setNewCategory("");

      setMessage("Kategorija je bila dodana.");

    } catch (err) {

      setError(
          "Napaka pri dodajanju kategorije: " + err.message
      );

    }
  }

  // NOVO: iskanje in razvrscanje stroskov

  async function handleSearch(event) {

    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const filters = {
      search,
      sortBy,
      direction
    };

    try {

      await refreshExpenses(filters);

      setAppliedFilters(filters);

    } catch (err) {

      setError(
          "Napaka pri iskanju: " + err.message
      );

    } finally {

      setLoading(false);

    }
  }

  // NOVO: brisanje iskalnih pogojev

  async function handleClearFilters() {

    const defaultFilters = {
      search: "",
      sortBy: "date",
      direction: "desc"
    };

    setSearch("");
    setSortBy("date");
    setDirection("desc");

    setError("");
    setMessage("");
    setLoading(true);

    try {

      await refreshExpenses(defaultFilters);

      setAppliedFilters(defaultFilters);

    } catch (err) {

      setError(
          "Napaka pri nalaganju: " + err.message
      );

    } finally {

      setLoading(false);

    }
  }

  return (

      <div className="app">

        <header>
          <h1>ExpenseTracker</h1>
          <p>Aplikacija za spremljanje osebnih stroškov</p>
        </header>

        {error && (
            <p role="alert" style={{ color: "#b91c1c" }}>
              {error}
            </p>
        )}

        {message && (
            <p role="status" style={{ color: "#15803d" }}>
              {message}
            </p>
        )}

        {/* STATISTIKA */}

        <section className="statistics">

          <div className="stat-card">
            <h3>Skupni prikazani stroški</h3>
            <strong>{total.toFixed(2)} €</strong>
          </div>

          <div className="stat-card">
            <h3>Število prikazanih stroškov</h3>
            <strong>{expenses.length}</strong>
          </div>

        </section>

        {/* DODAJANJE IN UREJANJE STROSKOV */}

        <section className="form-section">

          <h2>
            {editingId !== null
                ? "Uredi strošek"
                : "Dodaj nov strošek"}
          </h2>

          <form onSubmit={handleSubmit}>

            <label>Naziv</label>

            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
            />

            <label>Znesek (€)</label>

            <input
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                required
            />

            <label>Kategorija</label>

            <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
            >

              {categories.length === 0 && (
                  <option value="">
                    Ni kategorij
                  </option>
              )}

              {categories.map(category => (

                  <option
                      key={category.id}
                      value={category.id}
                  >
                    {category.name}
                  </option>

              ))}

            </select>

            <label>Datum</label>

            <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
            />

            <label>Opis (neobvezno)</label>

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
            />

            <button
                type="submit"
                disabled={saving || categories.length === 0}
            >
              {saving
                  ? "Shranjevanje..."
                  : editingId !== null
                      ? "Shrani spremembe"
                      : "Dodaj strošek"}
            </button>

            {editingId !== null && (

                <button
                    type="button"
                    className="secondary-button"
                    onClick={resetForm}
                >
                  Prekliči urejanje
                </button>

            )}

          </form>

        </section>

        {/* DODAJANJE KATEGORIJ */}

        <section className="form-section">

          <h2>Dodaj novo kategorijo</h2>

          <form onSubmit={handleAddCategory}>

            <label>Ime kategorije</label>

            <input
                value={newCategory}
                onChange={event =>
                    setNewCategory(event.target.value)
                }
                placeholder="Npr. Zabava"
                required
            />

            <button type="submit">
              Dodaj kategorijo
            </button>

          </form>

        </section>

        {/* NOVO: ISKANJE IN RAZVRSCANJE */}

        <section className="form-section">

          <h2>Iskanje in razvrščanje stroškov</h2>

          <form onSubmit={handleSearch}>

            <label>Iskanje po nazivu</label>

            <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Vnesi naziv stroška..."
            />

            <label>Razvrsti po</label>

            <select
                value={sortBy}
                onChange={event => setSortBy(event.target.value)}
            >
              <option value="date">Datum</option>
              <option value="amount">Znesek</option>
              <option value="title">Naziv</option>
            </select>

            <label>Vrstni red</label>

            <select
                value={direction}
                onChange={event =>
                    setDirection(event.target.value)
                }
            >
              <option value="desc">Padajoče</option>
              <option value="asc">Naraščajoče</option>
            </select>

            <button type="submit">
              Uporabi
            </button>

            <button
                type="button"
                className="secondary-button"
                onClick={handleClearFilters}
            >
              Počisti filtre
            </button>

          </form>

        </section>

        {/* SEZNAM STROSKOV */}

        <section className="list-section">

          <h2>Seznam stroškov</h2>

          {loading ? (

              <p>Nalaganje stroškov...</p>

          ) : expenses.length === 0 ? (

              <p>Ni najdenih stroškov.</p>

          ) : (

              <div className="table-wrapper">

                <table>

                  <thead>

                  <tr>
                    <th>Naziv</th>
                    <th>Znesek</th>
                    <th>Kategorija</th>
                    <th>Datum</th>
                    <th>Dejanja</th>
                  </tr>

                  </thead>

                  <tbody>

                  {expenses.map(expense => (

                      <tr key={expense.id}>

                        <td>{expense.title}</td>

                        <td>
                          {Number(expense.amount).toFixed(2)} €
                        </td>

                        <td>{expense.categoryName}</td>

                        <td>{expense.date}</td>

                        <td>

                          <div className="actions">

                            <button
                                onClick={() =>
                                    handleDetails(expense.id)
                                }
                            >
                              Podrobnosti
                            </button>

                            <button
                                onClick={() =>
                                    handleEdit(expense)
                                }
                            >
                              Uredi
                            </button>

                            <button
                                className="delete-button"
                                onClick={() =>
                                    handleDelete(expense.id)
                                }
                            >
                              Izbriši
                            </button>

                          </div>

                        </td>

                      </tr>

                  ))}

                  </tbody>

                </table>

              </div>

          )}

        </section>

        {/* PODROBNOSTI STROSKA */}

        {selectedExpense && (

            <section className="details-section">

              <h2>Podrobnosti stroška</h2>

              <p>
                <b>Naziv:</b> {selectedExpense.title}
              </p>

              <p>
                <b>Znesek:</b>{" "}
                {Number(selectedExpense.amount).toFixed(2)} €
              </p>

              <p>
                <b>Kategorija:</b>{" "}
                {selectedExpense.categoryName}
              </p>

              <p>
                <b>Datum:</b> {selectedExpense.date}
              </p>

              <p>
                <b>Opis:</b>{" "}
                {selectedExpense.description || "Brez opisa"}
              </p>

              <button
                  onClick={() =>
                      setSelectedExpense(null)
                  }
              >
                Zapri
              </button>

            </section>

        )}

      </div>
  );
}

export default App;
