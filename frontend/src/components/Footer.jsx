import { useNavigate } from "react-router-dom"
const Footer = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='container flex justify-between items-center'>
                <div className=' p-5 flex items-center'>
                    <span className=' underline text-slate-700 hover:text-green-500 text-lg font-bold cursor-pointer' onClick={()=>{navigate("/")}}>Home</span>
                    <span className='w-[2px] h-[30px] bg-green-500 inline-block mx-5'></span>
                    <span>&copy; Copy Right 2024</span>
                </div>
                <div>
                    <span className='p-5'>support</span>
                </div>
            </div>
        </>
    )
}

export default Footer
