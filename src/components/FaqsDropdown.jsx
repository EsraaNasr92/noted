export default function FaqsDropdown({ faq, isOpen, onToggle }){
    return(
        <div className="dropdown-item border-b border-gray-700 mb-2">
            {/* Question */}
            <button
                onClick={onToggle}
                className="dropdown-header w-full flex justify-between items-center p-3 bg-gray-800 hover:bg-gray-700 rounded"
            >
                <span>{faq.question}</span>  {/* ✅ show the question */}
                <span>{isOpen ? "−" : "+"}</span>
            </button>

            {/* Answer */}
            {isOpen && (
                <div className="dropdown-content p-3 bg-gray-900 rounded mt-1">
                    {faq.answer}  {/* ✅ show the answer */}
                </div>
            )}
        </div>
    )
}