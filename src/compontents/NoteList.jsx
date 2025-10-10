export default function NoteCard(){
    return(
        <div className="space-y-2 p-4 pt-0">
            <div className="p-5 mb-5 cursor-pointer card">
                <h3 className="font-semibold mb-3">My goals for the next year</h3>
                <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  I was reminiscing about...</p>
            </div>
            <div className="p-5 mb-5 cursor-pointer card active">
                <h3 className="font-semibold mb-3">Reflection on the Month of June</h3>
                <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  It's hard to believe that...</p>
            </div>
            <div className="p-5 mb-5 cursor-pointer card">
                <h3 className="font-semibold mb-3">My Favorite Memories from Childhood</h3>
                <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  I was reminiscing about...</p>
            </div>
            <div className="p-5 mb-5 cursor-pointer card">
                <h3 className="font-semibold mb-3">Reflections on My First Year of College</h3>
                <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  It's hard to believe that...</p>
            </div>
        </div>
    )
}