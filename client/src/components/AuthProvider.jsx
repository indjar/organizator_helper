import { useState } from "react";
import { AuthContext } from "../hook/auth.js";
import { Auth } from "../services/authService.js";
// extract email from jwt
const decodeToken = (token) => {
   
    let email = null;
    if (token && token !== "undefined") {
        const tokenPayload = token.split(".")[1];
        const decodedPayload = atob(tokenPayload);
        const parsedPayload = JSON.parse(decodedPayload);
        email = parsedPayload.email;
    }
    return email
}
export const AuthProvider = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const [state, setState] = useState({
        token,
        email: decodeToken(token),
        error: null,
    });
    const login = async (user, password) => {
        const res = await Auth.login(user, password);
        console.log('login',{res});
        if (res.err) {
            console.error(res.err);
            setState({ error: res.err, token: null });
            return { error: res.err };
        }
        setState(({ error: null, token: res.token, email: decodeToken(res.token) }));
        sessionStorage.setItem("token", res.token);
        return { token: res.token };
    };
    const logout = () => {
        console.log('logout')
        setState({
            token: null,
            error: null,
            email: null
        })
        sessionStorage.removeItem("token");

    };
    const value = { ...state, login, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};