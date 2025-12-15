import { FiInfo, FiSettings } from "react-icons/fi";

export default function UserList({ setActiveUserView }) {
    return (
        <div className="space-y-4">
        <div
            onClick={() => setActiveUserView("settings")}
            className="flex items-center text-xl font-semibold p-2 cursor-pointer hover:bg-gray-700 rounded"
        >
            <FiSettings size={20} />
            <span className="px-2">Settings</span>
        </div>

        <div
            onClick={() => setActiveUserView("info")}
            className="flex items-center text-xl font-semibold p-2 cursor-pointer hover:bg-gray-700 rounded"
        >
            <FiInfo size={20} />
            <span className="px-2">Information</span>
        </div>
        </div>
    );
}
