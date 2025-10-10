import data from '../data/data.json';

export default function NoteCard(){
    return(
        <div className="space-y-2 p-4 pt-0">
            {data.cards.map(card => (
                <div key={card.id} className="p-5 mb-5 cursor-pointer card">
                    <h3 className="font-semibold mb-3">{card.title}</h3>
                    <p className="text-gray-400 truncate"><span className="pr-2">{card.date}</span>  {card.description}</p>
                </div>
            ))}
        </div>
    )
}