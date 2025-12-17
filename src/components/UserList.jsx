import { FiHelpCircle, FiInfo, FiSettings } from "react-icons/fi";

// setActiveUserView From dashboard to active appropriate tab
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

            <div
                onClick={() => setActiveUserView("faqs")}
                className="flex items-center text-xl font-semibold p-2 cursor-pointer hover:bg-gray-700 rounded"
            >
                <FiHelpCircle size={20} />
                <span className="px-2">FAQs</span>
            </div>
        </div>
    );
}
