import { useState } from "react";
import { AuthContext } from "../hook/auth";
import { Auth } from "../services/authService";

const decodeToken = (token) => {
  if (!token) return null;

  const [, tokenPayload] = token.split(".");
  const decodedPayload = atob(tokenPayload);

  return JSON.parse(decodedPayload);
};

export const AuthProvider = ({ children }) => {
  const token = sessionStorage.getItem("token");

  const [state, setState] = useState({
    ...decodeToken(token),
    error: null,
    token,
  });

  const login = async (email, password) => {
    const res = await Auth.login(email, password);

    if (res.err) {
      console.error(res.err);
      setState({ error: res.err, token: null });
      alert(`${res.err}`);
      return { error: res.err };
    }

    setState({
      ...decodeToken(res.token),
      error: null,
      token: res.token,
    });
    sessionStorage.setItem("token", res.token);

    return { ...state };
  };

  const logout = () => {
    setState({
      token: null,
      error: null,
    });

    sessionStorage.removeItem("token");
  };

  const value = { ...state, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
