export default function App() {
  return (
      <div className="h-screen text-white">
          <div className="grid grid-cols-[16rem_minmax(0,1fr)_minmax(0,3fr)] h-full">

              <div className="border-r border-gray-700 p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                      <h1 className="text-xl font-bold">Noted</h1>
                  </div>
                  <button className="flex items-center justify-center p-3 mb-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-150">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      New Note
                  </button>
                  <nav className="space-y-1">
                      <div className="p-3 rounded-lg bg-indigo-900 text-white">Reflection on the Month of June</div>
                      <div className="p-3 rounded-lg text-gray-400 hover:bg-gray-700">Project proposal</div>
                      <div className="p-3 rounded-lg text-gray-400 hover:bg-gray-700">Travel Itinerary</div>
                  </nav>
                  <div className="mt-8">
                      <h3 className="text-xs uppercase text-gray-500 mb-2">Folders</h3>
                      <ul className="space-y-1">
                          <li className="p-2 text-gray-400 hover:bg-gray-700 rounded">Personal</li>
                          <li className="p-2 text-gray-400 hover:bg-gray-700 rounded">Work</li>
                      </ul>
                  </div>
                  <div className="mt-8">
                      <h3 className="text-xs uppercase text-gray-500 mb-2">More</h3>
                      <ul className="space-y-1">
                          <li className="p-2 text-gray-400 hover:bg-gray-700 rounded">Favorites</li>
                          <li className="p-2 text-gray-400 hover:bg-gray-700 rounded">Trash</li>
                      </ul>
                  </div>
              </div>

              <div className="border-r border-gray-800 overflow-y-auto">
                  <div className="p-4 sticky top-0 z-10">
                      <h2 className="text-xl font-semibold">Personal</h2>
                  </div>
                  <div className="space-y-2 p-4 pt-0">
                      <div className="p-3 rounded-lg bg-gray-700 cursor-pointer">
                          <p className="font-semibold text-white">Reflection on the Month of June</p>
                          <p className="text-sm text-gray-400 truncate">21/06/2022 | It's hard to believe that...</p>
                      </div>
                      <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                          <p className="font-semibold">My Favorite Memories from Childhood</p>
                          <p className="text-sm text-gray-400 truncate">11/04/2022 | I was reminiscing about...</p>
                      </div>
                      <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                          <p className="font-semibold">Reflections on My First Year of College</p>
                          <p className="text-sm text-gray-400 truncate">08/04/2022 | It's hard to believe that...</p>
                      </div>
                      </div>
              </div>

              <div className="overflow-y-auto p-8">
                  <div className="mb-8">
                      <h2 className="text-3xl font-bold mb-2">Reflection on the Month of June</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>📅 Date</span>
                          <span>21/06/2022</span>
                          <span className="ml-4">🗂️ Folder</span>
                          <span>Personal</span>
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
