// List of notes in the middle section
export default function NoteList({ selectedID, setSelectedID, notes, selectedFolder, showFavorites, showArchive }) {
    let filteredNotes = notes;

    if (showFavorites) {
        filteredNotes = notes.filter(note => note.isFavorite);
    } else if (showArchive) {
        filteredNotes = notes.filter(note => note.isArchive);
    } else if (selectedFolder !== "All") {
        filteredNotes = notes.filter(note => note.folder === selectedFolder);
    }

    return (
        <div>
            <div className="space-y-2 p-4 pt-0">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map(card => (
                            <div
                                key={card.id}
                                className={`p-5 mb-5 cursor-pointer  transition-colors duration-150 ${
                                    selectedID === card.id
                                    ? "bg-[var(--color-cardsActiveBackground)] text-white"
                                    : "bg-[var(--color-cardsBackground)] text-white hover:bg-[var(--color-secondaryBackgroundHover)]"
                                }`}
                                onClick={() => setSelectedID(card.id)}
                            >
                            <h3 className="font-semibold mb-3">{card.title}</h3>
                            <p className="text-gray-400 truncate">
                                <span className="pr-2">{card.date || ""}</span>
                                {card.description || ""}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 px-4">No notes found in this folder.</p>
                )}
            </div>
        </div>
    );
}
