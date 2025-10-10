export default function NoteEditor(){
    return(
        <div className="flex items-center space-x-2 border-b border-gray-700 pb-4 mb-6">
            <span className="px-2 py-1 bg-gray-700 rounded text-sm">Paragraph</span>
            <span className="px-2 py-1 bg-gray-700 rounded text-sm">16</span>
            <button className="p-1 hover:bg-gray-700 rounded font-bold">B</button>
            <button className="p-1 hover:bg-gray-700 rounded italic">I</button>
            <button className="p-1 hover:bg-gray-700 rounded underline">U</button>
            <button className="p-1 hover:bg-gray-700 rounded">🔗</button>
            <button className="p-1 hover:bg-gray-700 rounded">🖼️</button>
        </div>
    )
}