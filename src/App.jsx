import { useState } from 'react';
import Header from './compontents/Header';
import NoteCard from './compontents/NoteCard';
import NoteList from './compontents/NoteList';
import data from "./data/data.json";
import Folder from './sidebar/Folders';
import MoreOptions from './sidebar/MoreOptions';
import Recents from './sidebar/Recents';

export default function App() {
    const [selectedID, setSelectedID] = useState(null);
    const [notes, setNotes] = useState(data.cards);
    const [folders, setFolders] = useState(data.folders);
    const [selectedFolder, setSelectedFolder] = useState("All"); // current folder

    return (
        <div className="h-screen text-white">
            <div className="grid grid-cols-[19rem_minmax(0,1fr)_minmax(0,3fr)] h-full">
                <div className="border-r border-gray-700 flex flex-col">
                    <Header
                        notes={notes}
                        setNotes={setNotes}
                        folders={folders}
                        setFolders={setFolders}
                    />
                    <Recents />
                    <Folder
                        folders={folders}
                        setFolders={setFolders}
                        setSelectedFolder={setSelectedFolder}
                        selectedFolder={selectedFolder}
                    />
                    <MoreOptions />
                </div>
                <div className="border-r border-gray-800 overflow-y-auto bg-(--color--columnsBackground) p-5">
                    <div className="p-4 sticky top-0 z-10">
                        <h2 className="text-xl font-semibold">
                        {selectedFolder === "All"
                            ? "All Notes"
                            : folders.find((folder) => folder.title === selectedFolder)?.title || "Folder not found"}
                        </h2>
                    </div>
                    <NoteList
                        selectedID={selectedID}
                        setSelectedID={setSelectedID}
                        notes={notes}
                        selectedFolder={selectedFolder}
                    />
                </div>
                <div className="overflow-y-auto p-8">
                    <NoteCard
                        selectedID={selectedID}
                        setSelectedID={setSelectedID}
                        setNotes={setNotes}
                        notes={notes}
                    />
                </div>

            </div>
        </div>
    );
}
