export default function Header(){
    return(
        <>
            <div className="flex justify-between items-center mt-6">
                <h1 className="flex text-xl font-bold px-4">Noted

                </h1>
                <div className="search pr-5 cursor-pointer">
                    <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
            </div>
            <button className="flex items-center justify-center p-3  my-7 rounded-sm transition duration-150 btn">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New Note
            </button>
        </>
    )
}