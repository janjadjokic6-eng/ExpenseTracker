
const BASE_URL = "http://localhost:8080/api";

async function request(path, options = {}) {
    const response = await fetch(BASE_URL + path, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(
            "Napaka pri zahtevku. HTTP status: " + response.status
        );
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export const api = {

    getExpenses: (search = "", sortBy = "date", direction = "desc") => {
        const params = new URLSearchParams({
            search,
            sortBy,
            direction
        });

        return request("/expenses?" + params.toString());
    },

    getExpense: (id) =>
        request("/expenses/" + id),

    createExpense: (data) =>
        request("/expenses", {
            method: "POST",
            body: JSON.stringify(data)
        }),

    updateExpense: (id, data) =>
        request("/expenses/" + id, {
            method: "PUT",
            body: JSON.stringify(data)
        }),

    deleteExpense: (id) =>
        request("/expenses/" + id, {
            method: "DELETE"
        }),

    getCategories: () =>
        request("/categories"),

    createCategory: (name) =>
        request("/categories", {
            method: "POST",
            body: JSON.stringify({ name })
        })
};
