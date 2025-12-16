import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        try {
            const u = localStorage.getItem("user");
            return u ? JSON.parse(u) : null;
        } catch {
            return null;
        }
    });

    // Set token in axios
    useEffect(() => {
        setAuthToken(token || null);
    }, [token]);

    // Fetch full user on app start
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const res = await axios.get("http://localhost:5000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data); // full user with gender & phone
                localStorage.setItem("user", JSON.stringify(res.data));
            } catch (err) {
                console.error(err);
                logout();
            }
        };
        fetchUser();
    }, [token]);

    const login = (tokenValue, userData) => {
        localStorage.setItem("token", tokenValue);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(tokenValue);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
