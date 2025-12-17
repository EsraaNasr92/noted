import { useState } from "react";
import faqsData from "../data/faqs.json";
import DropDownItem from "./FaqsDropdown";

export default function FaqsDropdownList() {
    // Only one open at a time
    const [openId, setOpenId] = useState(null);

    const toggleItem = (id) => {
        // If clicked item is already open, close it; otherwise, open it
        setOpenId(prev => (prev === id ? null : id));
    };

    const faqs = faqsData.faqs;

    return (
        <div className="dropdown-list">
            {faqs.map(faq => (
                <DropDownItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id} // ✅ single open item
                    onToggle={() => toggleItem(faq.id)}
                />
            ))}
        </div>
    );
}
