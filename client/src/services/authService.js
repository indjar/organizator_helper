const AUTH_URL=`http://localhost:8080/v1/users/`;

export class Auth {
    static async register (email, password) {
        const res=await fetch (`${AUTH_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return res.json();
    }

    static async login(email, password) {
        const res=await fetch (`${AUTH_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return res.json();
    }
}