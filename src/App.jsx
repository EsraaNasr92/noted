export default function App() {
    return (
        <div className="h-screen text-white">
            <div className="grid grid-cols-[19rem_minmax(0,1fr)_minmax(0,3fr)] h-full">

                <div className="border-r border-gray-700 flex flex-col">
                    <div className="flex justify-between items-center mt-6">
                        <h1 className="text-xl font-bold px-4">Noted</h1>
                    </div>
                    <button className="flex items-center justify-center p-3  my-7 rounded-sm transition duration-150 btn">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        New Note
                    </button>
                    <nav className="space-y-1 nav-items">
                        <h3 className="text-md text-gray-400 mb-2 px-4">Recents</h3>
                        <div className="flex items-center gap-2 mb-4 py-4 bg-indigo-900 text-white w-full cursor-pointer px-4">
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                            </svg>Reflection on the Month of June
                        </div>
                        <div className="flex items-center gap-2 mb-4 py-2 text-gray-400 hover:bg-gray-700 cursor-pointer px-4">
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                            </svg>Project proposal</div>
                        <div className="flex items-center gap-2  py-2 mb-4 text-gray-400 hover:bg-gray-700 cursor-pointer px-4">
                            <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"/>
                            </svg>Travel Itinerary</div>
                    </nav>
                    <div className="mt-8">
                        <h3 className="flex items-center justify-between text-md text-gray-400 mb-5 px-4">Folders
                            <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M5 4a2 2 0 0 0-2 2v1h10.968l-1.9-2.28A2 2 0 0 0 10.532 4H5ZM3 19V9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm9-8.5a1 1 0 0 1 1 1V13h1.5a1 1 0 1 1 0 2H13v1.5a1 1 0 1 1-2 0V15H9.5a1 1 0 1 1 0-2H11v-1.5a1 1 0 0 1 1-1Z" clipRule="evenodd"/>
                        </svg>
                        </h3>
                        <ul className="space-y-1">
                            <li className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                                </svg>Personal
                            </li>
                            <li className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                                </svg>Work
                            </li>
                            <li className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                                </svg>Travel
                            </li>
                            <li className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                                </svg>Events
                            </li>
                            <li className="flex gap-2 items-center mb-5 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                                </svg>Finances
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-md text-gray-400 mb-5 px-4">More</h3>
                        <ul className="space-y-1">
                            <li className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                                </svg> Favorites
                                
                            </li>
                            <li className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                                Trash
                            </li>
                            <li className="flex gap-2 items-center mb-4 py-2 text-gray-400 hover:bg-gray-700 rounded cursor-pointer px-4">
                                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                                    </svg> Archived Notes
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-r border-gray-800 overflow-y-auto bg-(--color--columnsBackground) p-5">
                    <div className="p-4 sticky top-0 z-10">
                        <h2 className="text-xl font-semibold">Personal</h2>
                    </div>
                    <div className="space-y-2 p-4 pt-0">
                        <div className="p-5 mb-5 cursor-pointer card">
                            <h3 className="font-semibold mb-3">My goals for the next year</h3>
                            <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  I was reminiscing about...</p>
                        </div>
                        <div className="p-5 mb-5 cursor-pointer card active">
                            <h3 className="font-semibold mb-3">Reflection on the Month of June</h3>
                            <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  It's hard to believe that...</p>
                        </div>
                        <div className="p-5 mb-5 cursor-pointer card">
                            <h3 className="font-semibold mb-3">My Favorite Memories from Childhood</h3>
                            <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  I was reminiscing about...</p>
                        </div>
                        <div className="p-5 mb-5 cursor-pointer card">
                            <h3 className="font-semibold mb-3">Reflections on My First Year of College</h3>
                            <p className="text-gray-400 truncate"><span className="pr-2">11/04/2022</span>  It's hard to believe that...</p>
                        </div>
                        </div>
                </div>

                <div className="overflow-y-auto p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-8">Reflection on the Month of June</h2>
                        <div className="space-x-4 text-gray-400">
                            <div className="flex items-center mb-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                                </svg>
                                <h4 className="pl-2 font-semibold text-md">Date</h4>
                                <div className="text-white font-semibold text-md underline ml-10">21/06/2022</div>
                            </div>
                            <hr />
                            <div className="flex items-center mt-4">
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
                                </svg>
                                <h4 className="pl-2 font-semibold text-md">Folder</h4>
                                <div className="text-white font-semibold text-md underline ml-7">Personal</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 border-b border-gray-700 pb-4 mb-6">
                        <span className="px-2 py-1 bg-gray-700 rounded text-sm">Paragraph</span>
                        <span className="px-2 py-1 bg-gray-700 rounded text-sm">16</span>
                        <button className="p-1 hover:bg-gray-700 rounded font-bold">B</button>
                        <button className="p-1 hover:bg-gray-700 rounded italic">I</button>
                        <button className="p-1 hover:bg-gray-700 rounded underline">U</button>
                        <button className="p-1 hover:bg-gray-700 rounded">🔗</button>
                        <button className="p-1 hover:bg-gray-700 rounded">🖼️</button>
                    </div>

                    <div className="prose prose-invert max-w-none text-lg">
                        <p>It's hard to believe that June is already over! Looking back on the month, there were a few highlights that stand out to me.</p>
                        <p>One of the best things that happened was **getting promoted at work**...</p>
                        <p>I also had a great time on my **vacation to Hawaii**...</p>
                        <h3>On the downside...</h3>
                        <p>I feel like I didn't make as much progress on my fitness goals as I would have liked...</p>
                        <p>I also had a few rough patches in my relationships this month...</p>
                        <p>Overall, it was a good month with a mix of ups and downs...</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
