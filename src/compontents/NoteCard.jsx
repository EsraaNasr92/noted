import { useEffect, useRef, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';

// Card details based on based card ID from NoteList component "add state and props in App.jsx"
export default function NoteCard({ selectedID, setSelectedID, setNotes, notes, folders, setFolders }) {
    const card = notes.find((c) => c.id === selectedID);
    const folder = folders.find((f) => f.id === card?.folder);

    useEffect(() => {
        // Fetch folder name from database
        async function fetchFolder(){
            try {
                const response = await fetch("http://localhost:5000/api/folders");
                const data = await response.json();

                // Normalize MongoDB _id to id
                const normalized = data.map((note) => ({
                    ...note,
                    id: note._id,
                }));

                setFolders(normalized);
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        }
        fetchFolder();

        console.log("Note folder ID:", card?.folder);
    console.log("Found folder:", folders);

    }, []);

    useEffect(() => {

        console.log("Selected ID:", selectedID);
        console.log("Card found:", card);
    }, [selectedID, card]);

    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null);

    const [isFavorite, setIsFavorite] = useState(card?.isFavorite || false);
    const [isArchive, setIsArchive] = useState(card?.isArchive || false);
    const [isDeleted, setISDelete] = useState(card?.isDeleted || false);
    const [isEditable, setIsEditable] = useState(card?.isEditable || false);

      // edit-mode flags (booleans)
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDate, setEditingDate] = useState(false);
    const [editingFolder, setEditingFolder] = useState(false);
    
    const [editableTitle, setEditableTitle] = useState("");
    const [editableDate, setEditableDate] = useState("");
    const [editableFolder, setEditableFolder] = useState("");
    
    useEffect(() => {
        if(card) {
            setIsFavorite(card.isFavorite || false);
            setIsArchive(card.isArchive || false);
            setISDelete(card.isDeleted || false);

            setEditableTitle(card.title || "");
            setEditableDate(card.date || "");
            setEditableFolder(card.folder?.title || "");
        }
    }, [card]);

    // close dropdown menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!selectedID) return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <svg className="w-25 h-25 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
            </svg>
            <h1 className='text-[28px] font-semibold mb-2 text-white'>Select a note to view</h1>
            <p className='text-[20px] text-[var(--color-textSecondary)]'>Choose a note from the list on the left to view its contents, or create a <br /> new note to add to your collection.</p>
        </div>
    );

    if (!card) return <p>Note not found</p>;

    // helper: update note(s) and persist
    const updateNotes = (patch) => {
        const updatedNotes = notes.map((note) => (note.id === selectedID ? { ...note, ...patch } : note));
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const handleOptions = () => {
        setShowOptions((prev) => !prev);
    }

    // handle add to favorite
    const handleAddToFavorite = async  () => {
        const updatedValue = !card.isFavorite;

        try {
            const response = await fetch(`http://localhost:5000/api/notes/${selectedID}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isFavorite: updatedValue }),
            });
        if (!response.ok) throw new Error("Failed to update favorite status");

        const updatedNote = await response.json();

        const updatedNotes = notes.map(note =>
            note.id === selectedID
            ?{ ...note, isFavorite: updatedValue } // Toggle
            :note
        );
        setNotes(updatedNotes);

        // persist favorites in localStorage
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setIsFavorite(updatedValue);
        setShowOptions(false);
        console.log("Favorite status updated in DB");
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    }

    // handle add to favorite
const handleAddToArchive = async () => {
    const updatedValue = !card.isArchive;

    try {
        const response = await fetch(`http://localhost:5000/api/notes/${selectedID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchive: updatedValue }),
        });

        if (!response.ok) throw new Error("Failed to update archive status");

        const updatedNote = await response.json();

        const updatedNotes = notes.map((note) =>
        note.id === selectedID ? { ...note, ...updatedNote } : note
        );

        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setIsArchive(updatedValue);
        setShowOptions(false);

        console.log("Archive status updated in DB");
    } catch (err) {
        console.error("Error updating archive:", err);
    }
};


    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to move this note to the trash?");
        if (!confirmDelete) return;

        try {
            // Mark as deleted (don't remove from database)
            const response = await fetch(`http://localhost:5000/api/notes/${selectedID}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json "},
                body: JSON.stringify({
                    isDeleted: true
                }),
            });

            if (!response.ok) throw new Error(error.message || "Failed to move note to Trash");

            const updatedNote = await response.json();

            // Update local state
            const updatedNotes = notes.map(note =>
                note.id === selectedID ? { ...note, ...updatedNote } : note
            );
            setNotes(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes));

            setSelectedID(null);
            setShowOptions(false);
            console.log("Note moved to trash successfully");
        } catch (err) {
            console.error("Error deleting note:", err);
            alert("Failed to delete note. Please try again.");
        }
    };

    // Save handlers for each field (independent)
    const saveTitle = () => {
        // only update if changed
        if (editableTitle !== card.title) updateNotes({ title: editableTitle });
        setEditingTitle(false);
    };

    const saveDate = () => {
        if (editableDate !== card.date) updateNotes({ date: editableDate });
        setEditingDate(false);
    };

    const saveFolder = (newFolder) => {
        // allow passing newFolder (from select change) or use editableFolder
        const value = newFolder ?? editableFolder;
        if (value !== card.folder?._id) updateNotes({ folder: value });
        setEditableFolder(value);
        setEditingFolder(false);
    };
    return (
        <>
            <div className="mb-8" key={card.id}>
                <div className="flex justify-between">
                    {editingTitle ? (
                        <input
                        type="text"
                        value={editableTitle}
                        onChange={(e) => setEditableTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                saveTitle();
                            if (e.key === "Escape") {
                                setEditableTitle(card.title || "");
                                setEditingTitle(false);
                            }
                        }}
                    onBlur={saveTitle}
                        className="text-3xl font-bold mb-8 bg-transparent border-b border-gray-500 focus:outline-none text-white"
                        autoFocus
                        />
                    ) : (
                        <h2
                        className="text-3xl font-bold mb-8 text-white cursor-pointer"
                        onDoubleClick={() => setEditingTitle(true)}
                        >
                        {editableTitle}
                        </h2>
                    )}
                    
                    <button
                        type="button"
                        name="options"
                        onClick={handleOptions}
                        className="p-2 transition"
                    >
                        <svg className="w-10 h-10 text-white dark:text-white border rounded-full cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                        </svg>
                    </button>
                    {/* Show dropdown menu */}
                    {showOptions && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-10 top-24 mt-2 w-45 bg-[#333333] border border-[#333333] rounded-md shadow-lg overflow-hidden z-20 animate-fadeIn">
                            <button
                                className="flex gap-2 block w-full text-left px-4 py-4 text-[16px] text-[var(--color-textPrimary)] hover:bg-[var(--color-secondaryBackgroundHover)]"
                                onClick={handleAddToFavorite}
                            >
                                {card.isFavorite ? (
                                    // ★ filled star (when favorite)
                                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                                    </svg>

                                ) : (
                                    // ☆ empty star (when not favorite)
                                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                                    </svg>

                                )}
                                <span className="text-white">
                                    {isFavorite ? "Added to favorite" : "Add to favorite"}
                                </span>
                            </button>
                            <button
                                className="flex gap-2 block w-full text-left px-4 py-4 text-[16px] text-[var(--color-textPrimary)] hover:bg-[var(--color-secondaryBackgroundHover)]"
                                onClick={handleAddToArchive}
                            >
                                {card.isArchive ? (
                                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                                    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z"/>
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                                    </svg>
                                )}
                                <span>{isArchive ? "Archived" : "Archive"}</span>
                                
                            </button>
                                <hr className="text-gray-400" />
                            <button
                                className="flex gap-2 block w-full text-left px-4 py-4 text-[16px] text-[var(--color-textPrimary)] hover:bg-[var(--color-secondaryBackgroundHover)]"
                                onClick={handleDelete}
                            >
                                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                                Trash
                            </button>
                        </div>
                    )
                    }
                </div>
                

                <div className="space-x-4 text-gray-400">
                    <div className="flex items-center mb-4">
                        <svg
                            className="w-6 h-6 text-gray-400 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                            />
                        </svg>
                        <h4 className="pl-2 font-semibold text-md">Date</h4>
                            {editingDate ? (
                                <input
                                    type="date"
                                    value={editableDate}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setEditableDate(newValue);
                                        saveDate(newValue);
                                    }}
                                    onBlur={() => saveDate()}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                            saveDate();
                                        if (e.key === "Escape") {
                                            setEditableDate((card.date) || "");
                                            setEditingDate(false);
                                        }
                                    }}
                                    className="ml-3 bg-transparent border-b border-gray-500 text-white focus:outline-none"
                                />
                            ) : (
                                <div className="ml-3 text-white font-semibold underline">
                                    <span
                                        className="cursor-pointer"
                                        onDoubleClick={() => setEditingDate(true)}
                                    >
                                        {editableDate}
                                    </span>
                                </div>
                            )}
                    </div>

                    <hr className="border-gray-600 my-1" />

                    <div className="flex items-center mt-4">
                        <svg
                            className="w-6 h-6 text-gray-400 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"
                            />
                        </svg>
                        <h4 className="pl-2 font-semibold text-md">Folder</h4>
                        {editingFolder ? (
                            <select
                                value={editableFolder}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setEditableFolder(newValue);
                                    saveFolder(newValue);
                                }}
                                onBlur={() => saveFolder()}
                                className="ml-3 bg-transparent border-b border-gray-500 text-white focus:outline-none"
                                autoFocus
                            >
                            {folders.map((folder) => (
                                <option key={folder._id} value={folder._id}>
                                    {folder.title}
                                </option>
                            ))}
                            </select>
                        ) : (
                            <div className="ml-3 text-white font-semibold underline">
                                <span
                                    className="cursor-pointer"
                                    onDoubleClick={() => setEditingFolder(true)}
                                >
                                    {editableFolder}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <MarkdownEditor
                setSelectedID={setSelectedID}
                selectedID={selectedID}
                notes={notes}
                setNotes={setNotes}
            />
        </>
    );
}