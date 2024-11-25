import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import httpClient from "../components/httpClient";

const Register = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "age") {
            setAge(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
        console.log('error',e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser();
    };

    const registerUser = async () => {
        try {
            const resp = await httpClient.post("/register", {
                name,
                age,
                email,
                password,
            });

            alert("Registration successful! Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("All fields are required!");
            } else if (error.response && error.response.status === 409) {
                alert("User already exists!");
            } else {
                alert("An error occurred during registration.");
            }
        }
    };

    return (
        <>
            <img src="/auth-img.9302755e73810f6c27d2.png" alt="myImage" className="absolute w-[800px] bottom-0" />
            <div className='500 h-[100vh] flex justify-end ' style={{ backgroundColor: "rgb(78 ,172, 109)" }}>
                <div>
                    <div className='text-5xl font-bold text-white mt-12 ml-10 flex items-center'>
                        <p className='ml-2'> Handilingo</p>
                    </div>
                </div>
                <div className='bg-white h-[90vh] w-[70vw] flex justify-center items-center mr-10 mt-10 rounded-lg mx-auto'>
                    <div className='flex flex-col items-center h-[80vh]'>
                        <h1 className='text-3xl font-bold mb-[60px]' style={{ color: "#4f4f4f" }}>Welcome to Handilingo!</h1>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='w-[550px] bg-white p-5 shadow-md rounded-lg'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold'>Register</h1>
                                </div>
                                <form className='mt-5 p-3' onSubmit={handleSubmit}>
                                    <div className='mb-4'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            placeholder='Enter your name'
                                            value={name}
                                            onChange={handleOnChange}
                                            required
                                            className='w-full p-2 border border-gray-300 rounded-lg'
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='age'>Age</label>
                                        <input
                                            type='number'
                                            id='age'
                                            name='age'
                                            placeholder='Enter your age'
                                            value={age}
                                            onChange={handleOnChange}
                                            required
                                            className='w-full p-2 border border-gray-300 rounded-lg'
                                        />
                                    </div>
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
                                    <button type='submit' className='mt-5 h-[50px] w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg'>Register</button>
                                </form>
                                <p className='mt-5 text-sm text-center'>
                                    Already have an account? <Link to={"/login"} className='font-bold hover:text-green-500 hover:underline'>Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;