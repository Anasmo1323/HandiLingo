const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white" style={{backgroundColor:'rgb(78, 172, 109)'}}>
      <div className="flex flex-col rounded-full items-center justify-center bg-white p-24">
      <h1 className="text-9xl font-bold mb-4 " style={{color:'rgb(78, 172, 109)'}}>404</h1>
      <p className="text-2xl mb-8 " style={{color:'rgb(78, 172, 109)'}}>Page Not Found</p>
      </div>
      <a href="/" className="bg-white text-green-700 font-bold py-3 px-6 mt-5 rounded-lg hover:bg-gray-200 transition duration-300">
        Go to Home
      </a>
    </div>
  );
};

export default NotFound;