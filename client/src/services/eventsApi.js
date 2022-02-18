const AUTH_URL = `http://localhost:8080/events`

export class EventsApi {
    static async getAll(token) {
        const res = await fetch(`${AUTH_URL}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    };

    static async add(event, token) {
        console.log(event, token)
        const res = await fetch(`${AUTH_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(event),
        });
        return res.json();
    };

    static async delete(id) {
        console.log(id)
        const res = await fetch(`${AUTH_URL}/${id}`, {
            method: "DELETE"
        });

        return res.json();
    };

    static async update(event, id) {
        const res = await fetch(`${AUTH_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });
        console.log(res)
        return res.json();
    };
}
