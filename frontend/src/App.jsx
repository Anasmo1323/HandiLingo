import React, { useState } from 'react';
import Navbar_ from './components/Navbar_';
import Sidebar from './components/Sidebar';
import Lessons from './components/Lessons';
import Footer from './components/Footer';
const App = () => {

    const [selectedLevel, setSelectedLevel] = useState('Beginner');

    return (
        <>
            <Navbar_ />
            <div className=' min-h-[100vh]' style={{ backgroundColor: ' #f2f2f2' }}>
                <div className="container">
                    <div className='flex gap-x-10 p-5'>
                        <div className='basis-1/3'>
                            <Sidebar setSelectedLevel={setSelectedLevel} />
                        </div>
                        <div className='basis-2/3'>
                            <Lessons selectedLevel={selectedLevel} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <script src="js/main.js"></script>
        </>
    );
};

export default App;