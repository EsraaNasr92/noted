import { useState } from 'react';

// folder section in sidebar
export default function Folder({ folders, setFolders, setSelectedFolder }){
    
    const [newFolder, setNewFolder] = useState("");
    const [showInput, setShowInput] = useState(false)

    const addNewFolder = () => {
        if (!newFolder.trim()) return; // To prevent empty input
        const newFolderObj = {
            id: folders.length > 0 ? folders[folders.length - 1].id + 1 : 1, // auto-generate id
            title: newFolder.trim()
        };
        setFolders([...folders, newFolderObj]);
        setShowInput(false)
        setNewFolder("");
    }

    return(
        <div className="mt-8">
            <h3 className="flex items-center justify-between text-md text-gray-400 mb-5 px-4">Folders
                <button
                    className='bg-transparent hover:bg-transparent cursor-pointer'
                    onClick={() => setShowInput(true)} // to get addNewFolder and open Modal
                    type="button"
                >
                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clipRule="evenodd"/>
                    </svg>
                </button>
            </h3>
            {/* Show input to add new folder */}
            {showInput &&(
                <div className='flex gap-2 py-2 px-4'>
                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                    </svg>
                    <input
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    placeholder="Folder name"
                    className="w-full p-1 mb-4 border-gray-600 bg-gray-700 text-white rounded bg-transparent outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addNewFolder();
                        }
                    }}
                    required
                />
                </div>
            )}
            {/* Retrive data from JSON file */}
            <ul className="space-y-1">
                {folders.map(folder => (
                    <li
                        key={folder.id}
                        onClick={() => setSelectedFolder(folder.title)}
                        className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4"
                    >
                        <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                        </svg>{folder.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}