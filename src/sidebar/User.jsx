import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function User({ onClick }) {
    const { logout, user } = useContext(AuthContext);

    return (
        <div className="flex items-center justify-between mb-4 px-5">
            <span
                className="text-xl font-semibold cursor-pointer"
                onClick={onClick}
            >
                Hello, {user?.name}
            </span>
            <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}