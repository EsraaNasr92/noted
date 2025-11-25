import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function User(){
    const { logout, user } = useContext(AuthContext);

    return (
        <>
            <h1 className="text-3xl font-semibold mb-6">Hello {user?.name}</h1>
                <button
                    onClick={() => logout()}
                    className="mt-auto w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
        </>
    );
}
