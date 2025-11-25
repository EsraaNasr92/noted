import { createContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            setAuthToken(token);
        // Optionally decode token to get user info or fetch /me from backend.
        // setUser({}); // placeholder: or fetch user profile
        } else {
            setAuthToken(null);
            setUser(null);
        }
    }, [token]);

    const login = (tokenValue, userData) => {
        localStorage.setItem("token", tokenValue);
        setToken(tokenValue);
        setUser(userData)
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
