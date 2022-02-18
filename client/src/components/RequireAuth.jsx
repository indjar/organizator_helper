import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/auth";

export const RequireAuth = ({ children }) => {
    const auth = useAuth();

    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    return children;
};
