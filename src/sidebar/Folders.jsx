import { useState } from 'react';
import data from '../data/data.json';

// folder section in sidebar
export default function Folder(){
    const [folders, setFolders] = useState(data.folders)
    const [newFolder, setNewFolder] = useState("");
    const [showModal, setShowModal] = useState(false)

    const addNewFolder = () => {
        if (!newFolder.trim()) return; // To prevent empty input
        const newFolderObj = {
            id: folders.length > 0 ? folders[folders.length - 1].id + 1 : 1, // auto-generate id
            title: newFolder.trim()
        };
        setFolders([...folders, newFolderObj]);
        setShowModal(false)
        setNewFolder("");
    }

    return(
        <div className="mt-8">
            <h3 className="flex items-center justify-between text-md text-gray-400 mb-5 px-4">Folders
                <button
                    className='bg-transparent hover:bg-transparent cursor-pointer'
                    onClick={() => setShowModal(true)} // to get addNewFolder and open Modal
                    type="button"
                >
                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clipRule="evenodd"/>
                    </svg>
                </button>
            </h3>
            {/* Show Modal to add new folder */}
            {showModal &&(
                <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-100">
                        <h2 className="text-lg font-semibold mb-4 text-white">Add New Folder</h2>
                        <input
                            value={newFolder}
                            onChange={(e) => setNewFolder(e.target.value)}
                            placeholder="Folder name"
                            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addNewFolder();
                                }
                            }}
                            required
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewFolder}
                                className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Retrive data from JSON file */}
            {folders.map(folder => (
                <ul className="space-y-1">
                    <li key={folder.id} className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                        <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                        </svg>{folder.title}
                    </li>
                </ul>
            ))}
        </div>
    )
}