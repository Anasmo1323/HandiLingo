
const Navbar_ = () => {
    return (
        <div >
            <div className='container'>

                <div className='  flex justify-between items-start p-3'>
                    <div className='logo flex items-center gap-x-3'>
                        <img src='logo.png' alt='React Jobs' className="w-20 h-20" />
                        <span className=' text-[40px] font-bold'>Handilingo</span>
                    </div>
                    <div className='item-list flex items-center'>
                        <ul className='flex m-5 gap-x-5 text-[20px] text-gray-600' style={{ fontWeight: 700 }}>
                            <li className='hover:text-green-500'><a href='/'>Home</a></li>
                            <li className='hover:text-green-500'><a href='/'>Tests</a></li>
                            <li className='hover:text-green-500'><a href='/'>Achievements</a></li>
                        </ul>
                        <span className='w-[2px] h-[30px] bg-green-500 inline-block mx-5'></span>
                        <select className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ease-in-out hover:border-green-400">
                            <option className="text-gray-800 bg-white hover:bg-green-100 cursor-pointer" value="account-settings">
                                Account Settings
                            </option>
                            <option className="text-red-800 bg-white hover:bg-green-100 cursor-pointer" value="logout">
                                Logout
                            </option>
                        </select>
                    </div>
                </div>

            </div>
            <section className=" bg-green-700 p-2">
                <div className='container'>
                    <div className=" px-5 py-3  rounded-md flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                                <img
                                    src="avatar.png"
                                    alt="Profile"
                                    className="rounded-full w-full h-full"
                                />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold text-lg">Old Growth (5/5)</h2>
                                <div className=" bg-gray-200 rounded-full h-3 mt-2 w-[500px]">
                                    <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex  items-center">
                            <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                                <span className="text-green-500 font-bold text-2xl">00:00</span>
                                <p className="text-xs">Daily Goal</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Navbar_