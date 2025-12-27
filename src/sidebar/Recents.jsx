export default function Recents({ notes, openNotes }){
    // Filter out deleted notes
    const activeNotes = notes.filter(note => !note.isDeleted);

    // Sort by createdAt or updatedAt (most recent first)
    const sortedNotes = [...activeNotes].sort(
        (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );

    // Take only the 5 most recent
    const recentNotes = sortedNotes.slice(0, 3);

    return(
        <nav className="space-y-1 nav-items">
            <h3 className="text-md text-gray-400 mb-2 px-4">Recents</h3>
            {recentNotes.length === 0 ? (
                <p className="text-gray-500 px-4">No recent notes</p>
            ):(
                <div >
                    {recentNotes.map(note => (
                        <div
                            key={note.id}
                            onClick={() => openNotes(note.id)}
                            className="flex items-center gap-2 mb-1 py-1 text-gray-400 hover:bg-gray-700 w-full cursor-pointer px-4"
                        >
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                            </svg> {note.title}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    )
}