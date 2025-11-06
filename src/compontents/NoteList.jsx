import { useEffect, useState } from 'react';
import API_BASE from "../apiConfig.js";
// List of notes in the middle section
export default function NoteList({
    selectedID,
    setSelectedID,
    notes,
    setNotes ,
    selectedFolder,
    showFavorites,
    showArchive,
    showDeletedNotes
    }) {
    
    const [openMenuId, setOpenMenuId] = useState(null); // Dropdown menu for the delete options
    let filteredNotes = notes;

    if (showFavorites) {
        filteredNotes = notes.filter(note => note.isFavorite);
    } else if (showArchive) {
        filteredNotes = notes.filter(note => note.isArchive);
    } else if (showDeletedNotes){
        filteredNotes = notes.filter(note => note.isDeleted);
    }else if (selectedFolder !== "All") {
        filteredNotes = notes.filter(
            note => note.folder?._id === selectedFolder || note.folder === selectedFolder
        );
    }

    useEffect(() => {
        // Fetch Notes from database
        async function fetchNotes(){
            try {
                const response = await fetch(`${API_BASE}/api/notes`);
                const data = await response.json();

                // Normalize MongoDB _id to id
                const normalized = data.map((note) => ({
                    ...note,
                    id: note._id,
                }));

                setNotes(normalized);
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        }
        fetchNotes();

        const handleClickOutside  = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return() => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Restore note
    const handleRestore = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/api/notes/${id}/restore`, {
                method: "PATCH",
            });

            // Try parsing JSON safely
            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error("Invalid JSON response from server");
            }

            if (response.ok) {
                console.log("Note restored:", data.note);
                const updatedNotes = notes.filter(note => note.id !== id);
                setNotes(updatedNotes);
                setOpenMenuId(null);
                setSelectedID(null);
            } else {
                console.error("Failed to restore note:", data.message);
            }
        } catch (error) {
            console.error("Error restoring note:", error);
        }
    };

    // Delete Permanently
    const handlePermanentDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to permanently delete this note?");
        try {

            const response = await fetch(`${API_BASE}/api/notes/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (response.ok) {
                const updatedNotes = notes.filter(note => note.id !== id);
                setNotes(updatedNotes);
                console.log("Note permanently deleted");
            } else {
                const data = await response.json();
                console.error("Failed to delete:", data.message);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }

    };
    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    }
    return (
            <div>
                <div className="space-y-2 p-4 pt-0">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map(card => (
                            <div
                                key={card.id}
                                className={`relative p-5 mb-5 transition-colors duration-150 rounded-lg cursor-pointer ${
                                    selectedID === card.id
                                        ? "bg-[var(--color-cardsActiveBackground)] text-white"
                                        : "bg-[var(--color-cardsBackground)] text-white hover:bg-[var(--color-secondaryBackgroundHover)]"
                                }`}
                                onClick={() => !showDeletedNotes && setSelectedID(card.id)} // disable opening in Trash
                            >
                                <h3 className="font-semibold mb-3">{card.title}</h3>
                                <p className="text-gray-400 truncate">
                                    <span className="pr-2">{new Date(card.date).toLocaleDateString('en-CA') || ""}</span>
                                    {card.description || ""}
                                </p>

                                {/* Trash dropdown menu */}
                                {showDeletedNotes && (
                                    <div className="absolute top-4 right-4">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleMenu(card.id);
                                            }}
                                            className="p-2 rounded-full hover:bg-gray-700 transition"
                                        >
                                            <svg
                                                className="w-6 h-6 text-gray-300"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" d="M6 12h.01M12 12h.01M18 12h.01" />
                                            </svg>
                                        </button>

                                        {/* Dropdown menu */}
                                        {openMenuId === card.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-[#333333] border border-[#333333] rounded-lg shadow-lg z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRestore(card.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-t-lg"
                                                >
                                                    Restore
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handlePermanentDelete(card.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 hover:text-white rounded-b-lg"
                                                >
                                                    Permanent Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 px-4">No notes found in this folder.</p>
                    )}
                </div>
            </div>
    );
}
