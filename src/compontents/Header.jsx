import { useState } from "react";

export default function Header( { notes, setNotes } ){
    const [newNote, setNewNote] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [showModal, setShowModal] = useState(false);

    const addNewNote = () => {
        console.log("New note title:", newNote);

        if (!newNote.trim()) return; // To prevent empty input

        const newCardObj = {
            id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1, // auto-generate id
            title: newNote.trim(),
            description: description.trim(),
            date: date || new Date().toISOString().split("T")[0] // default to today's date
        };
        setNotes([...notes, newCardObj]);
        setShowModal(false);
        setNewNote("");
        setNewDescription("");
        setNewDate("")
    }
    return(
        <>
            <div className="flex justify-between items-center mt-6">
                <h1 className="flex text-xl font-bold px-4">Noted

                </h1>
                <div className="search pr-5 cursor-pointer">
                    <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
            </div>
            <button
                className="flex items-center justify-center p-3  my-7 rounded-sm transition duration-150 btn"
                onClick={() => setShowModal(true)}
                type="button"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New Note
            </button>

            {/* Show modal to add new note */}
            {showModal &&(
                <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-100">
                        <h2 className="text-lg font-semibold mb-4 text-white">Add New Note</h2>
                        <input
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add your new note"
                            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addNewNote();
                                }
                            }}
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a description"
                            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded"
                            rows="3"
                        />

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white rounded"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
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