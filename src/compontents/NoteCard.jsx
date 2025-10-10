import NoteEditor from './NoteEditor';

export default function NoteCard(){
    return(
        <>
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
                <NoteEditor />
                <div className="prose prose-invert max-w-none text-lg">
                    <p>It's hard to believe that June is already over! Looking back on the month, there were a few highlights that stand out to me.</p>
                    <p>One of the best things that happened was **getting promoted at work**...</p>
                    <p>I also had a great time on my **vacation to Hawaii**...</p>
                    <h3>On the downside...</h3>
                    <p>I feel like I didn't make as much progress on my fitness goals as I would have liked...</p>
                    <p>I also had a few rough patches in my relationships this month...</p>
                    <p>Overall, it was a good month with a mix of ups and downs...</p>
                </div>
        </>
    )
}