import { IoMdClose } from "react-icons/io";
import {useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });


  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit =async (e) => {
    console.log(data);
  }

  

  return (
    <>
      <img src="/auth-img.9302755e73810f6c27d2.png" alt="myImage" className="absolute w-[800px] bottom-0" />
      <div className='500 h-[100vh] flex justify-end ' style={{ backgroundColor: "rgb(78 ,172, 109)" }}>
        <div>
          <div
            className='text-5xl font-bold text-white mt-12 ml-10 flex items-center'
          >
            <p className='ml-2'> Handilingo</p>
          </div>
        </div>
        <div className='bg-white h-[90vh] w-[70vw] flex justify-center items-center mr-10 mt-10 rounded-lg mx-auto'>
          <div className='flex flex-col  items-center h-[80vh]'>
              <h1 className='text-3xl font-bold mb-[100px] ' style={{ color: "#4f4f4f" }}>Welcome Back!</h1>
            <div className='flex flex-col justify-center items-center'>
              <div className='w-[530px] bg-white p-5 shadow-md rounded-lg'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-2xl font-bold'>Login</h1>
                </div>
                <form className='mt-5 p-3' onSubmit={handleSubmit}>

                  <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2'>email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='enter your email'
                      value={data.email}
                      onChange={handleOnChange}
                      required
                      className='w-full p-2 border border-gray-300 rounded-lg' />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='password' className='block mb-2'>password</label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      placeholder='enter your password'
                      value={data.password}
                      onChange={handleOnChange}
                      required
                      className='w-full p-2 border border-gray-300 rounded-lg' />
                  </div>
                  <div 
                      className='flex justify-between items-center'
                    >
                    <p
                      to={"/forgot-password"}
                      className=' hover:text-green-500 hover:underline'
                    >Forgot Password ?</p>
                  </div>


                  <button type='submit' className='mt-5 h-[50px] w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg'>Login</button>
                </form>
                <p
                  className='mt-5 text-sm text-center'
                >Do not have an Account ? <Link to={"/register"} className='font-bold hover:text-green-500 hover:underline'>Register</Link></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Login
