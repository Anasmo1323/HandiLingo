import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import httpClient from "../components/httpClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logInUser();
  };


const logInUser = async () => {
  try {
    const resp = await httpClient.post("/login", {
      email,
      password,
    });

      console.log("before navigation");
      navigate("/dashboard"); // Redirect to the dashboard
    console.log("after navigation");
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Invalid credentials");
    } else {
        console.error("Login error:", error);
    }
  }
};
// useEffect(() => {
//   (async () => {
//     try {
//       const resp = await httpClient.get("/@me");
//       setUser(resp.data); // Set user data if authenticated
//
//     } catch (error) {
//       setUser(null); // Simply set `user` to null if not authenticated, don't redirect
//       console.log("User not authenticated", error);
//     }
//   })();
// }, []);
  return (
    <>
      <img src="/auth-img.9302755e73810f6c27d2.png" alt="myImage" className="absolute w-[800px] bottom-0" />
      <div className='500 h-[100vh] flex justify-end ' style={{ backgroundColor: "rgb(78 ,172, 109)" }}>
        <div>
          <div className='text-5xl font-bold text-white mt-12 ml-10 flex items-center'>
            <p className='ml-2 cursor-pointer' onClick={()=>{navigate('/')}} > Handilingo</p>
          </div>
        </div>
        <div className='bg-white h-[90vh] w-[70vw] flex justify-center items-center mr-10 mt-10 rounded-lg mx-auto'>
          <div className='flex flex-col items-center h-[80vh]'>
            <h1 className='text-3xl font-bold mb-[100px]' style={{ color: "#4f4f4f" }}>Welcome Back!</h1>
            <div className='flex flex-col justify-center items-center'>
              <div className='w-[530px] bg-white p-5 shadow-md rounded-lg'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-2xl font-bold'>Login</h1>
                </div>
                <form className='mt-5 p-3' onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2'>Email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={handleOnChange}
                      required
                      className='w-full p-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='password' className='block mb-2'>Password</label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={handleOnChange}
                      required
                      className='w-full p-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div className='flex justify-between items-center'>
                    <Link to={"/forgot-password"} className='hover:text-green-500 hover:underline'>
                      Forgot Password?
                    </Link>
                  </div>
                  <button type='submit' className='mt-5 h-[50px] w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg'>
                    Login
                  </button>
                </form>
                <p className='mt-5 text-sm text-center'>
                  Do not have an Account? <Link to={"/register"} className='font-bold hover:text-green-500 hover:underline'>Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;