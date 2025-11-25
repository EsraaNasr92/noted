import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.PROD
        ? import.meta.env.VITE_API_BASE_URL
        : "http://localhost:5000/api",
    headers: { "Content-Type": "application/json" },
});

export const signupUser = (data) => API.post("/signup", data);
export const loginUser = (data) => API.post("/login", data);

export const setAuthToken = (token) => {
    if(token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete API.defaults.headers.common["Authorization"];
}