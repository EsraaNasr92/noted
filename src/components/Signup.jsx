import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.name || !form.email || form.password.length < 6) {
            setError("Please fill all fields; password must be at least 6 characters.");
            return;
        }

        try {
            const res = await signupUser(form);
            setError("");
            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setSuccess("");
            setError(err?.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-(--color-background)">
            <div className="w-full max-w-sm p-6 bg-(--color-cardsBackground) rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Sign up</h2>
                
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Sign up
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500">
                    If you already have an account,{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
