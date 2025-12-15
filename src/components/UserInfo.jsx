import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserInfo({ toast }) {
    const { user, token, setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        gender: user?.gender || "",
        phone: user?.phone || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
        setLoading(true);

        const res = await axios.patch(
            "http://localhost:5000/api/user",
            {
                gender: formData.gender,
                phone: formData.phone,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

            setUser(res.data.user);
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
            User Information
        </h2>

        {/* Name */}
        <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
            value={formData.name}
            disabled
            className="w-full px-4 py-2 rounded bg-gray-600 text-gray-300 cursor-not-allowed"
            />
        </div>

        {/* Email */}
        <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
            value={formData.email}
            disabled
            className="w-full px-4 py-2 rounded bg-gray-600 text-gray-300 cursor-not-allowed"
            />
        </div>

        {/* Gender */}
        <div>
            <label className="text-sm text-gray-400">Gender</label>
            <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            </select>
        </div>

        {/* Phone */}
        <div>
            <label className="text-sm text-gray-400">Phone</label>
            <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+20 1XXXXXXXXX"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* Save */}
        <div className="flex justify-end">
            <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
            {loading ? "Saving..." : "Save Information"}
            </button>
        </div>
        </div>
    );
}
