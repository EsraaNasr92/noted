// pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FaqsDropdownList from "../components/FaqsDropdownList";
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import NoteList from '../components/NoteList';
import NoteTabs from "../components/NoteTabs";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";
import UserSettings from "../components/UserSettings";
import data from "../data/data.json";
import Folder from '../sidebar/Folders';
import MoreOptions from '../sidebar/MoreOptions';
import Recents from '../sidebar/Recents';
import User from "../sidebar/User";

export default function Dashboard() {
    const [notes, setNotes] = useState(() => {
        try {
            const savedNotes = JSON.parse(localStorage.getItem("notes"));
            return savedNotes || data.cards;
        } catch {
            return data.cards;
        }
    });

    // Persist notes whenever they change
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const [folders, setFolders] = useState(data.folders);
    const [selectedFolder, setSelectedFolder] = useState("All");
    const [showFavorites, setShowFavorites] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [showDeletedNotes, setShowDeletedNotes] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [activeUserView, setActiveUserView] = useState(null);

    // browser-tabs style
    const [openTabs, setOpenTabs] = useState(() => {
        try {
            const savedTabs = JSON.parse(localStorage.getItem("openTabs")) || [];
            const currentNotes = JSON.parse(localStorage.getItem("notes")) || data.cards;
            return savedTabs.filter(id => currentNotes.some(note => note.id.toString() === id.toString()));
        } catch {
            return [];
        }
    });

    const [activeTabId, setActiveTabId] = useState(() => {
        try {
            const savedActive = localStorage.getItem("activeTabId");
            const currentNotes = JSON.parse(localStorage.getItem("notes")) || data.cards;
            return currentNotes.some(note => note.id.toString() === savedActive) ? savedActive : currentNotes[0]?.id || null;
        } catch {
            return data.cards[0]?.id || null;
        }
    });

    // Keep the pinned notes after refreshing
    const [pinNote, setPinNote] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("pinnedNotes")) || []
        } catch{
            return [];
        }
    });

    // Persist tabs
    useEffect(() => {
        localStorage.setItem("openTabs", JSON.stringify(openTabs));
        localStorage.setItem("activeTabId", activeTabId);
    }, [openTabs, activeTabId]);

    // Remove tabs if note deleted
    useEffect(() => {
        setOpenTabs(prev =>
            prev.filter(id =>
                notes.some(note => note.id.toString() === id.toString())
            )
        );
    }, [notes]);

    // Auto-select first tab if active one is gone
    useEffect(() => {
        if (activeTabId && !notes.some(note => note.id.toString() === activeTabId.toString())) {
            setActiveTabId(openTabs[0] || null);
        }
    }, [activeTabId, openTabs, notes]);

    const openNotes = (id) => {
        const noteId = id.toString();
        setOpenTabs(prev => prev.includes(noteId) ? prev : [...prev, noteId]);
        setActiveTabId(noteId);
    }

    // Toggle to pin/unpin the note
    const togglePin = (noteId) => {
        setPinNote(prev => {
            // unpin if already pinned
            if(prev.includes(noteId)){
                return prev.filter(id => id !== noteId);
            }

            if(prev.length >= 2){
                toast.warning("You can pin only 2 notes");
                return prev;
            }
            return [...prev, noteId];
        });
    }

    // Persist pinned notes on change
    useEffect(() => {
        localStorage.setItem("pinnedNotes", JSON.stringify(pinNote));
    }, [pinNote])

    // Clean pinned notes if note is deleted
    useEffect(() => {
        setPinNote(prev =>
            prev.filter(id =>
                notes.some(note => note.id.toString() === id.toString())
            )
        );
    }, [notes]);

    return (
        <div className="h-screen text-white">
            <div className="grid h-full
                            grid-cols-1
                            sm:grid-cols-[15rem_minmax(0,1fr)]
                            md:grid-cols-[19rem_minmax(0,1fr)]
                            lg:grid-cols-[19rem_minmax(0,1fr)_minmax(0,3fr)]"
            >
                {/* LEFT SIDEBAR */}
                <div className="border-r border-gray-700 flex flex-col min-w-0">
                    <ToastContainer />
                    <Header
                        notes={notes}
                        setNotes={setNotes}
                        folders={folders}
                        setFolders={setFolders}
                        toast={toast}
                    />
                    <Recents notes={notes} openNotes={openNotes} />
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
                    <User onClick={() => setShowUserList(prev => !prev)} />
                </div>

                {/* MIDDLE COLUMN */}
                <div className="border-r border-gray-800 lg:overflow-y-auto bg-(--color--columnsBackground) p-5 min-w-0">
                    <div className="p-1 top-0 z-10">
                        {showUserList ? (
                            <UserList setActiveUserView={setActiveUserView} />
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold">
                                    {selectedFolder === "All"
                                        ? "All Notes"
                                        : folders.find(f => f.id === selectedFolder)?.title || "Folder not found"}
                                </h2>
                                <NoteList
                                    openNotes={openNotes}
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

                {/* RIGHT COLUMN */}
                <div className="lg:overflow-y-auto min-w-0 flex flex-col">
                    {openTabs.length > 0 && (
                        <NoteTabs
                            openTabs={openTabs}
                            setOpenTabs={setOpenTabs}
                            activeTabId={activeTabId}
                            setActiveTabId={setActiveTabId}
                            notes={notes}
                            pinNote={pinNote}
                            togglePin={togglePin}
                        />
                    )}

                {/* Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {activeUserView === "settings" && <UserSettings toast={toast} />}
                    {activeUserView === "info" && <UserInfo toast={toast} />}
                    {activeUserView === "faqs" && <FaqsDropdownList toast={toast} />}

                    {/* Show NoteCard only if activeTabId exists in openTabs */}
                    {!activeUserView && activeTabId && openTabs.includes(activeTabId) ? (
                        <NoteCard
                            activeTabId={activeTabId}
                            setActiveTabId={setActiveTabId}
                            openTabs={openTabs}
                            setOpenTabs={setOpenTabs}
                            setNotes={setNotes}
                            notes={notes}
                            folders={folders}
                            setFolders={setFolders}
                        />
                    ) : (
                        // Empty state when no tab is active
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <svg className="w-25 h-25 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                            </svg>
                            <h1 className='text-[28px] font-semibold mb-2 text-white'>Select a note to view</h1>
                            <p className='text-[20px] text-[var(--color-textSecondary)]'>
                                Choose a note from the list on the left to view its contents, or create a <br /> new note to add to your collection.
                            </p>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
}
