import { toast } from "react-toastify";

export default function NoteTabs({
    openTabs,
    setOpenTabs,
    activeTabId,
    setActiveTabId,
    notes,
    togglePin,
    pinNote
}) {

    // function to close a tab
    const closeTab = (id) => {

        if(pinNote.includes(id)){
            toast.warning("Unpin the note before closing it");
            return
        };

        const noteId = id.toString();

        setOpenTabs((prev) => {
            const updatedTabs = prev.filter(tabId => tabId !== noteId);

            // If the closed tab was active, select a new active tab
            if (activeTabId === noteId) {
                // Pick the previous tab if exists, otherwise first tab, otherwise null
                const index = prev.indexOf(noteId);
                const newActive = prev[index - 1] || prev[index + 1] || null;
                setActiveTabId(newActive);
            }

            return updatedTabs;
        });
    }


    // Move pinned notes to the left
    const sortedTabs = [
        ...openTabs.filter(id => pinNote.includes(id)), //pinned first
        ...openTabs.filter(id => !pinNote.includes(id)) // then normal
    ];

    // Toggle pin on right-click
    const handleRightClick = (e, noteId) => {
        e.preventDefault(); // disable browser menu
        togglePin(noteId);
    }

    return (
        <div className="flex border-b border-gray-700">
            {sortedTabs.map((id) => {
                const note = notes.find(n => n.id === id);
                return (
                <div
                    key={id}
                    onClick={() => setActiveTabId(id)}
                    onContextMenu={(e) => handleRightClick(e, id)}
                    className = {`tab
                            ${activeTabId === id ? "active" : ""}
                            ${pinNote.includes(id) ? "pinned": ""}
                            px-4 py-2 cursor-pointer flex items-center gap-2
                            ${activeTabId === id ? "bg-[#333]" : "bg-[#222]"}`
                        }
                >
                    <span>
                        {pinNote.includes(id) && <span className="mr-1">📌</span>}
                        {note?.title || "Untitled"}
                    </span>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        closeTab(id);
                    }}
                    >
                    ✕
                    </button>
                </div>
                );
            })}
        </div>
    );
}

