export default  function Toolbar({ markdown, setMarkdown }) {
    const applyFormat = (before, after = "") => {
        const textarea = document.querySelector("textarea");
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = markdown.substring(start, end);
        const newText = before + selectedText + after;

        setMarkdown(markdown.substring(0, start) + newText + markdown.substring(end));
        setTimeout(() => {
        textarea.focus();
        textarea.selectionEnd = start + before.length + selectedText.length + after.length;
        }, 0);
    };

    const buttons = [
        { label: "B", action: () => applyFormat("**", "**"), tooltip: "Bold" },
        { label: "I", action: () => applyFormat("_", "_"), tooltip: "Italic" },
        { label: "Link", action: () => applyFormat("[", "](https://)") },
        { label: "Code", action: () => applyFormat("`", "`") },
        { label: "Quote", action: () => applyFormat("> ", "") },
        { label: "List", action: () => applyFormat("- ", "") },
        { label: "H1", action: () => applyFormat("# ", "") },
        { label: "H2", action: () => applyFormat("## ", "") },
    ];

    return (
        <div className="flex gap-2 border-b border-gray-700 pb-2">
        {buttons.map((btn) => (
            <button
            key={btn.label}
            onClick={btn.action}
            title={btn.tooltip}
            className="bg-gray-700 hover:bg-gray-600 text-sm px-3 py-1 rounded"
            >
            {btn.label}
            </button>
        ))}
        </div>
    );
}
