import { useEffect, useState } from 'react';

// folder section in sidebar
export default function Folder({ folders, setFolders, setSelectedFolder, selectedFolder }){
    const [newFolder, setNewFolder] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [editingFolderId, setEditingFolderId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    // Load folder from local storage
    useEffect(() => {
        const saveFolders = JSON.parse(localStorage.getItem("folder")) || [];
        if(saveFolders.length > 0) setFolders(saveFolders);
    }, []);
    
    // Save folder to localStorage
    useEffect(() => {
        localStorage.setItem("folder", JSON.stringify(folders));
    }, [folders]);

    const addNewFolder = async (e) => {
        e.preventDefault();

        if (!newFolder.trim()) return; // To prevent empty input
        try {
            const res = await fetch("http://localhost:5000/api/folders", {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({ title: newFolder}),
            });
            const saveFolder =  await res.json();

            if(!res.ok) throw new Error(saveFolder.message || "Failed to add folder");

            const newFolderObj = {
                id: saveFolder._id,
                title: saveFolder.title,
            };

            setFolders((prev) => [...prev, newFolderObj]);
            setShowInput(false)
            setNewFolder("");

        } catch (err) {
            console.error("Error adding folder:", err);
        }
    }

    const handleEditFolder = (folder) => {
        setEditingFolderId(folder.id);
        setEditedTitle(folder.title);
    }
    // save folder after editing
    const handleEditSave = async (folderId) => {
        if (!editedTitle.trim()) return;

        try {
            const response = await fetch(`http://localhost:5000/api/folders/${folderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editedTitle.trim() }),
            });

            const data = await response.json();

            if(!response.ok) throw new Error(data.massage || "Failed to rename folder");

            const updatedFolders = folders.map((f) =>
                f.id === folderId ? { ...f, title: editedTitle.trim() } : f
            );
            setFolders(updatedFolders);

            // ✅ Fix: Update selected folder if it's the same one being edited
            const oldFolder = folders.find(f => f.id === folderId);
            if (selectedFolder === oldFolder?.title) {
                setSelectedFolder(editedTitle.trim());
            }

            setEditingFolderId(null);
            setEditedTitle("");
        } catch (error) {
            console.error("Error renaming folder:", error);
        }
    }
    // Delete folder
    const handleDeleteFolder = async (folderId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/folders/${folderId}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if(!res.ok) throw new Error(data.message || "Failed to delete folder");

            const updatedFolders = folders.filter((f) => f.id !== folderId && f._id !== folderId);
            setFolders(updatedFolders);

            console.log("Folder delete Successfully", data);
            
        } catch (error) {
            console.error("Error deleting Folder:", error);
        }
    };
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
                            addNewFolder(e);
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
                        onClick={() => setSelectedFolder(folder.id || folder._id)}
                        onDoubleClick={() => handleEditFolder(folder)}
                        className={`group flex items-center justify-between mb-3 py-2 rounded cursor-pointer px-4 transition-colors duration-150
                            ${selectedFolder === folder.title
                            ? "bg-[var(--color-secondaryBackgroundHover)] text-white"
                            : "text-gray-400 hover:bg-gray-700"}`}
                    >
                    {/* Left side: Folder icon + name/input */}
                    <div className="flex items-center gap-2 w-full">
                        <svg
                        className="w-5 h-5 text-gray-400 dark:text-white flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"
                        />
                        </svg>

                        {editingFolderId === folder.id ? (
                        <input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditSave(folder.id);
                            }}
                            onBlur={() => handleEditSave(folder.id)}
                            className="bg-transparent text-white border-b border-gray-500 outline-none w-full"
                            autoFocus
                        />
                        ) : (
                        <span className="truncate">{folder.title}</span>
                        )}
                    </div>

                    {/* Right side: Edit + Delete icons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ml-2">
                        {/* Edit icon */}
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditFolder(folder);
                        }}
                        className="hover:text-blue-400"
                        title="Edit"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687 1.688a1.5 1.5 0 010 2.121l-8.495 8.495-3.182.795.795-3.182 8.495-8.495a1.5 1.5 0 012.121 0z"
                            />
                        </svg>
                        </button>

                        {/* Delete icon */}
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFolder(folder.id);
                        }}
                        className="hover:text-red-400"
                        title="Delete"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12m-1 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V7m3 0V5a1 1 0 011-1h2a1 1 0 011 1v2"
                            />
                        </svg>
                        </button>
                    </div>
                    </li>

                ))}
            </ul>
        </div>
    )
}