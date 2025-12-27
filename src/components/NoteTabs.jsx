export default function NoteTabs({
    openTabs,
    setOpenTabs,
    activeTabId,
    setActiveTabId,
    notes
}) {

    // function to close a tab
    const closeTab = (id) => {
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


    return (
        <div className="flex border-b border-gray-700">
        {openTabs.map((id) => {
            const note = notes.find(n => n.id === id);
            return (
            <div
                key={id}
                className={`px-4 py-2 cursor-pointer flex items-center gap-2
                ${activeTabId === id ? "bg-[#333]" : "bg-[#222]"}`}
                onClick={() => setActiveTabId(id)}
            >
                <span>{note?.title || "Untitled"}</span>
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

