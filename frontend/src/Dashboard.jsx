import  { useState } from 'react';
import Navbar_ from './components/Navbar_';
import Sidebar from './components/Sidebar';
import Lessons from './components/Lessons';
import Footer from './components/Footer';

const levelList = [
    {
        name: 'Beginner',
        progress: 50
    },
    {
        name: 'Intermediate',
        progress: 30
    },
    {
        name: 'Advanced',
        progress: 70
    }
];

const programList = [
    {
        name: 'Typing',
        progress: 50
    },
    {
        name: 'Reading',
        progress: 30
    },
    {
        name: 'Listening',
        progress: 70
    }
];


const Dashboard = () => {

    const [selectedLevel, setSelectedLevel] = useState('Beginner');

    const renderLevelList = () => {
        return levelList.map((level, index) => {
            return (
                <li className='bg-white rounded-md cursor-pointer hover:bg-slate-200' key={index} onClick={() => setSelectedLevel(level.name)}>
                    <div className='flex flex-col p-4'>
                        <span className='text-[20px]' style={{ fontWeight: 600 }}>{level.name}</span>
                        <span className='text-xs text-slate-400'>Progress</span>
                    </div>
                </li>
            );
        });
    };

    const renderProgramList = () => {
        return programList.map((program, index) => {
            return (
                <li className='bg-white rounded-md cursor-pointer hover:bg-slate-200' key={index} onClick={() => console.log(program.name)}>
                    <div className='flex flex-col p-4'>
                        <span className='text-[20px]' style={{ fontWeight: 600 }}>{program.name}</span>
                        <span className='text-xs text-slate-400'>Progress</span>
                    </div>
                </li>
            );
        });
    };

    return (
        <>
            <Navbar_ />
            <div className=' min-h-[100vh]' style={{ backgroundColor: ' #f2f2f2' }}>
                <div className="container">
                    <div className='flex gap-x-10 p-5'>
                        <div className='basis-1/3'>
                            <Sidebar  >
                                <div className='level-list'>
                                    <span className='text-gray-600 text-[20px] font-bold'>Learn to Type</span>
                                    <ul className='flex flex-col gap-y-2 mt-5'>
                                        {renderLevelList()}
                                    </ul>
                                </div>

                                <div className='program-list'>
                                    <span className='text-gray-600 text-[20px] font-bold'>Programs</span>
                                    <ul className='flex flex-col gap-y-2 mt-5'>
                                        {renderProgramList()}
                                    </ul>
                                </div>
                            </Sidebar>
                        </div>
                        <div className='basis-2/3'>
                            <Lessons selectedLevel={selectedLevel} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Dashboard
