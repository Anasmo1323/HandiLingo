import { useState } from "react"

const Navbar_ = () => {

    // here get fetch request to get user score and store it at state
    // eslint-disable-next-line no-unused-vars
    const [score, setScore] = useState(101)
    const badges = {
        100: "Beginner",
        200: "Intermediate",
        300: "Advanced",
        400: "Expert"
    }

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
            <section className=" p-2" style={{backgroundColor:'rgb(78, 172, 109)'}}>
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
                                <h2 className="text-white font-semibold text-2xl">Score : <span className="text-cyan-300">{score} xp</span> </h2>
                                <div className=" text-yellow-400  text-xl font-bold  ">
                                    {
                                        // here map any score value to one of the badges to this values [100,200,300,400]
                                        badges[Math.min(400, Math.ceil(score / 100) * 100)]
                                    }
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Navbar_