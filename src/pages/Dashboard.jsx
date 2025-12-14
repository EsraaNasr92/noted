// pages/Dashboard.jsx
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import NoteList from '../components/NoteList';
import data from "../data/data.json";
import Folder from '../sidebar/Folders';
import MoreOptions from '../sidebar/MoreOptions';
import Recents from '../sidebar/Recents';
import User from "../sidebar/User";
import UserList from "../components/UserList";

export default function Dashboard() {
    const [selectedID, setSelectedID] = useState(null);
    const [notes, setNotes] = useState(data.cards);
    const [folders, setFolders] = useState(data.folders);
    const [selectedFolder, setSelectedFolder] = useState("All");
    const [showFavorites, setShowFavorites] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [showDeletedNotes, setShowDeletedNotes] = useState(false);
    const [showUserList, setShowUserList] = useState(false);

    return (
        <div className="h-screen text-white">
            <div className="grid h-full
                            grid-cols-1
                            sm:grid-cols-[15rem_minmax(0,1fr)]
                            md:grid-cols-[19rem_minmax(0,1fr)]
                            lg:grid-cols-[19rem_minmax(0,1fr)_minmax(0,3fr)]"
            >
                <div className="border-r border-gray-700 flex flex-col min-w-0">
                    <ToastContainer />
                    <Header
                        notes={notes}
                        setNotes={setNotes}
                        folders={folders}
                        setFolders={setFolders}
                        toast={toast}
                    />
                    <Recents
                        notes={notes}
                        setSelectedID={setSelectedID}
                    />
                    <Folder
                        folders={folders}
                        setFolders={setFolders}
                        setSelectedFolder={(folder) => {
                            setSelectedFolder(folder);
                            setShowFavorites(false);
                            setShowArchive(false);
                            setShowDeletedNotes(false);
                        }}
                        selectedFolder={selectedFolder}
                        toast={toast}
                    />
                    <MoreOptions
                        setShowFavorites={setShowFavorites}
                        setSelectedFolder={setSelectedFolder}
                        setShowArchive={setShowArchive}
                        setShowDeletedNotes={setShowDeletedNotes}
                    />
                    <User onClick={() => setShowUserList(prev => !prev)}/>
                </div>
                <div className="border-r border-gray-800 lg:overflow-y-auto bg-(--color--columnsBackground) p-5 min-w-0">
                    <div className="p-4 top-0 z-10">
                        {showUserList ? (
                            <UserList />
                        ): (
                            <>
                            <h2 className="text-xl font-semibold">
                                {selectedFolder === "All"
                                    ? "All Notes"
                                    : folders.find((folder) => folder.id === selectedFolder)?.title || "Folder not found"}
                            </h2>
                            <NoteList
                                selectedID={selectedID}
                                setSelectedID={setSelectedID}
                                notes={notes}
                                setNotes={setNotes}
                                selectedFolder={selectedFolder}
                                setShowFavorites={setShowFavorites}
                                showFavorites={showFavorites}
                                setShowArchive={setShowArchive}
                                showArchive={showArchive}
                                showDeletedNotes={showDeletedNotes}
                                setShowDeletedNotes={setShowDeletedNotes}
                            />
                            </>

                        )}

                    </div>

                </div>
                <div className="lg:overflow-y-auto p-8 min-w-0">
                    <NoteCard
                        selectedID={selectedID}
                        setSelectedID={setSelectedID}
                        setNotes={setNotes}
                        notes={notes}
                        folders={folders}
                        setFolders={setFolders}
                    />
                </div>
            </div>
        </div>
    );
}
