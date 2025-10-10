import data from '../data/data.json';

// List of notes in the middle section
export default function NoteList({ selectedID, setSelectedID }){
    return(
        <div>
            <div className="space-y-2 p-4 pt-0">
                {/* Retrive data from JSON file */}
                {data.cards.map(card => (
                    <div
                        key={card.id}
                        className={`p-5 mb-5 cursor-pointer card ${selectedID === card.id ? 'bg-gray-700': ''}`}
                        onClick={() => setSelectedID(card.id)}
                        >
                        <h3 className="font-semibold mb-3">{card.title}</h3>
                        <p className="text-gray-400 truncate"><span className="pr-2">{card.date}</span>  {card.description}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}