import "highlight.js/styles/github-dark.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Toolbar from "./Toolbar";

export default function MarkdownEditor({ selectedID, setSelectedID, notes, setNotes }) {
    const card = notes.find((c) => c.id === selectedID); // get editor and description based on card ID
    const [markdown, setMarkdown] = useState("## Hello markdown");
    const [savedNote, setSavedNote] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // detect saved mode

    useEffect(() => {
        const saved = localStorage.getItem(`note_${card.id}`);
        if(saved){
            setSavedNote(saved);
            setMarkdown(saved);
            setIsPreview(true);
            setIsSaved(true);
        }else{
            setMarkdown(card.description || "## Start writing your note here...");
            setIsPreview(false);
            setIsSaved(false);
        }

    }, [card]);
    
    // Save note to localStorage
    const handleSave = async () => {
        if(!card) return;
        try {
            localStorage.setItem(`note_${card.id}`, markdown);
            //setSavedNote(markdown);
            setIsPreview(true);
            setIsSaved(true);
            console.log("Note saved locally");

            // Update in parent notes state
            const updatedNotes = notes.map((n) =>
                n.id === card.id ? { ...n, description: markdown } : n
            );

            setNotes(updatedNotes);

            // ✅ Save to backend
            const response = await fetch(`http://localhost:5000/api/notes/${card.id}/edit`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: markdown }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("❌ Error saving note:", data.message);
                return;
            }

            console.log("✅ Note saved to DB:", data.note);
            
            localStorage.setItem("notes", JSON.stringify(updatedNotes));

            console.log(`Note ${card.id} saved`);
        } catch (error) {
            
        }

    }

    // Handle preview toggle
    const handlePreview = () => {
        setIsPreview((prev) => !prev);
        if(isPreview) setIsSaved(false); // If going back to edit, reset saved flag
        console.log("Preview is here");
    };

    return(
        <div className="min-h-screen  text-white">
            <Toolbar
                markdown={markdown}
                setMarkdown={setMarkdown}
            />

            {/* Editor mood "switch between editor and preview" */}
            {!isPreview && (
                <div>
                    <textarea
                        className="w-full h-64 p-3 rounded mt-3 resize-none focus:outline-none border border-gray-700"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                    <button
                        type="button"
                        className="mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
                        onClick={handleSave}
                    >
                        Save Note
                    </button>

                    <button
                        type="button"
                        className="mt-3 ml-4 px-5 py-2 bg-blue-400 hover:bg-blue-700 rounded text-white font-medium"
                        onClick={handlePreview}
                    >
                        Preview
                    </button>
                </div>
            )}

            {/* Preview mood */}
            {isPreview && (
                <div className="mt-8 p-4 rounded border border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold text-gray-200">{isSaved ? "Saved Note" : "Preview"}</h2>
                        <button
                            onClick={handlePreview}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm"
                        >
                        Back to Edit
                        </button>
                    </div>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {savedNote || markdown || "Nothing to preview..."}
                        </ReactMarkdown>
                </div>
            )}
        </div>
    );
}