import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import httpClient from "./httpClient";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";


const testimonials = [
  {
    text: "I love this typing app! It has transformed the way I work and made me more efficient.",
    author: "A Happy User"
  },
  {
    text: "This app is amazing! My typing speed has increased significantly.",
    author: "Satisfied Customer"
  },
  {
    text: "A fantastic tool for anyone looking to improve their typing skills.",
    author: "Typing Enthusiast"
  },
  {
    text: "Highly recommend this app to all my friends and colleagues.",
    author: "Professional Typist"
  },
  {
    text: "The best typing app I've ever used. It's user-friendly and effective.",
    author: "Tech Savvy User"
  }
];

const features = [
  {
    title: "Engaging Curriculum",
    description: "Learn typing fundamentals designed for all skill levels."
  },
  {
    title: "Gamified Learning",
    description: "Enjoy interactive lessons with achievements to track progress."
  },
  {
    title: "Custom Lessons",
    description: "Enhance your skills by creating lessons tailored for you."
  },
  {
    title: "Standardized Prep",
    description: "Prepare for tests with free-response typing lessons."
  }
];


function Home() {

  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const logoutUser = async () => {
    await httpClient.post("/logout");
    setUser(null); // Ensure user state is cleared
    window.location.href = "/"; // Redirect to homepage after logout
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/@me");
        setUser(resp.data); // Set user data if authenticated
      } catch (error) {
        setUser(null); // Set user to null if not authenticated
        console.log("Not authenticated", error);
      }
    })();
  }, []); // This effect runs once on component mount


  const handlePrevClick = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];

  const renderFeatures = () => {
    return features.map((feature, index) => {
      return (
        <div className="bg-white shadow-md rounded-lg p-8 text-center " key={index}>
          <h3 className="text-xl font-semibold text-green-600">{feature.title}</h3>
          <p className="text-gray-600 mt-2">{feature.description}</p>
        </div>
      );
    });
  }


  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-green-600 text-white p-5 flex justify-between items-center">
        <div className="text-2xl font-bold">Handilingo</div>
        <nav>
          {user ? (
            <button
              onClick={logoutUser}
              className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 font-semibold"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-4">
              <a href="/login">
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 font-semibold">
                  Login
                </button>
              </a>
              <a href="/register">
                <button className="bg-green-800 px-4 py-2 rounded-lg text-white hover:bg-green-700 font-semibold">
                  Register
                </button>
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <div className="text-center p-10 bg-green-100 h-[70vh]">
        <div className="w-full h-full flex flex-col justify-center items-center">

        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Learn Sign Language and Others handicapped Languages
        </h1>
        <p className="text-xl text-gray-700">
          Join thousands of users to improve your Knowlage skills with personalized lessons.
        </p>
        {!user ? (
          <div className="mt-6 flex justify-center gap-4">
            <a href="/register">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
                Get Started
              </button>
            </a>
            <a href="/login">
              <button className="bg-white text-green-500 border-2 border-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-100">
                Login
              </button>
            </a>
          </div>
        ): navigate('/lessons')}
        </div>

      </div>

      {/* Features Section */}
      <div className="flex flex-col items-center p-[50px] ">
        <h2 className="text-center text-5xl font-bold text-green-700 mb-8">
          Why You will Love Our Lessons
        </h2>
        <div className="flex justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-8 gap-6">
            {renderFeatures()}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-green-100 p-6 sm:p-[50px] text-center">
        <h2 className="text-2xl sm:text-5xl font-bold text-green-700 mb-4 sm:mb-6">What Our Users Say</h2>
        <div className="flex flex-col lg:flex-row justify-around p-5">
          <div className="flex flex-col items-start mb-4 lg:mb-0">
            <p className="text-green-700 text-2xl sm:text-4xl font-bold">We are very happy to share some of</p>
            <p className="text-green-700 text-2xl sm:text-4xl font-bold">our users comments</p>
          </div>
          <div className="relative mt-5 w-full md:w-[40%] h-48">
            <div className="bg-white p-6 rounded-lg h-full flex flex-col justify-center items-center shadow-md">
              <p className="italic text-gray-600">{currentTestimonial.text}</p>
              <p className="mt-4 text-gray-500">- {currentTestimonial.author}</p>
            </div>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-500 p-4 rounded-full"
              onClick={handlePrevClick}
            >
              <FaArrowLeft size={24} />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-green-500 p-4 rounded-full"
              onClick={handleNextClick}
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
