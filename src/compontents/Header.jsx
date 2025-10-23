import { useState } from "react";

export default function Header( { notes, setNotes, folders } ){
    const [newNote, setNewNote] = useState({
        title: "",
        description: "",
        date: "",
        folder: "",
    });
    const [showAddNote, setShowAddNote] = useState(false);
    const [errors, setErrors] = useState(""); // For error message.
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery]= useState("");
    const[allNotes, setAllNotes]= useState(notes); // Store original list for a search

    // Show/hidden search input
    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
        setSearchQuery("");
        setNotes(allNotes);
    }

    // Search function
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if(!value.trim()){
            setNotes(allNotes);
            return;
        }
        const filtered = allNotes.filter((note) =>
            note.title.toLowerCase().includes(value.toLowerCase())
        );
        setNotes(filtered);
    }
    // For add new note validation
    const validateFields = () => {
        const newErrors = {};
        if (!newNote.title.trim()) newErrors.title = "Title is required.";
        if (!newNote.description.trim()) newErrors.description = "Description is required.";
        if (!newNote.date.trim()) newErrors.date = "Please select a date.";
        if (!newNote.folder.trim()) newErrors.folder = "Please choose a folder.";
        return newErrors;
    }

    // add new note function
    const addNewNote = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // clear error and add note

        try {
            const res = await fetch("http://localhost:5000/api/notes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: newNote.title.trim(),
                    description: newNote.description.trim(),
                    date: newNote.date || new Date().toISOString().split("T")[0], // default to today's date
                    folder: folders.find(f => f.title === newNote.folder)?._id,
                }),
            });

        const saveNote = await res.json();
        
        if(!res.ok) throw new Error(saveNote.message || "Failed to save note");

        const newCardObj = {
            title: newNote.title.trim(),
            description: newNote.description.trim(),
            date: newNote.date || new Date().toISOString().split("T")[0], // default to today's date
            folder: newNote.folder, // keep the folder name for display
            _id: saveNote._id, // keep MongoDB id for future updates/deletes
        }
        setNotes(prev => [...prev, newCardObj]);
        setNewNote({ title: "", description: "", date: "", folder: "" });
        setShowAddNote(false);
        } catch (err) {
            console.error("Error adding note:", err);
            setErrors({ general: "Failed to add note, please try again" });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // clear error as user types
    };

    return(
        <>
            <div className="flex justify-between items-center mt-6">
                <h1 className="flex text-xl font-bold px-4">Noted</h1>
                <div className="search pr-5 cursor-pointer">
                    <button
                        className="cursor-pointer"
                        name="search"
                        id="search"
                        onClick={toggleSearch}
                        type="button">
                        <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            {showSearch &&(
                <input
                    className="bg-[var(--color-secondaryBackground)] mt-5 p-2 focus:outline-none"
                    name="searchInput"
                    id="searchInput"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search note"
                    onKeyDown={(e) => {
                        if(e.key == "Enter"){
                            e.preventDefault();
                        }
                    }}
                />
            )}
            {searchQuery && (
                <p className="mt-2 text-[var(--color-textSecondary)]">
                🔍 Searching for: <span className="font-semibold">{searchQuery}</span>
                </p>
            )}
            <button
                className="flex items-center justify-center p-3  my-7 rounded-sm transition duration-150 btn"
                onClick={() => setShowAddNote(true)}
                type="button"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New Note
            </button>

            {/* Show modal to add new note */}
            {showAddNote &&(
                <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-150">
                        <h2 className="text-lg font-semibold mb-4 text-white">Add New Note</h2>
                        <input
                            name="title"
                            value={newNote.title}
                            onChange={handleChange}
                            placeholder="Note title"
                            className={`w-full p-2 border rounded mb-4 ${
                                errors.title ? "border-red-500" : "border-gray-600"
                            } bg-gray-700 text-white`}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addNewNote();
                                }
                            }}
                            required
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        <textarea
                            name="description"
                            value={newNote.description}
                            onChange={handleChange}
                            placeholder="Note description"
                            className={`w-full p-2 border rounded mb-4 ${
                                errors.description ? "border-red-500" : "border-gray-600"
                            } bg-gray-700 text-white`}
                            rows="3"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        <input
                            name="date"
                            type="date"
                            value={newNote.date}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded mb-4 ${
                                errors.date ? "border-red-500" : "border-gray-600"
                            } bg-gray-700 text-white`}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                        <select
                            name="folder"
                            value={newNote.folder}
                            id="folder"
                            onChange={handleChange}
                            className={`w-full p-2 border rounded mb-4 ${
                                errors.folder ? "border-red-500" : "border-gray-600"
                            } bg-gray-700 text-white`}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select folder
                            </option>
                            {folders.map(folder => (
                                <option key={folder.id}>{folder.title}</option>
                            ))}
                        </select>
                        {errors.folder && <p className="text-red-500 text-sm">{errors.folder}</p>}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowAddNote(false);
                                    setNewNote({ title: "", description: "", date: "", folder: ""});// reset inputs
                                    setErrors({}); // clear error
                                }}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewNote}
                                className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}