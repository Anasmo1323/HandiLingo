import { useEffect, useState } from 'react';
import Navbar_ from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LessonsList from '../components/LessonsList';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';


const programList = [
    {
        name: 'Letters',
        progress: 50
    },
    {
        name: 'Words',
        progress: 30
    },
    {
        name: 'Sentences',
        progress: 70
    }
];

const programContents = {
    Letters: ['a-c', 'd-f', 'g-i', 'j-l', 'm-o', 'p-r', 's-u', 'v-z'],
    Words: ['cat', 'dog', 'fish', 'ball', 'apple', 'banana', 'car', 'bus'],
    Sentences: [
        'The cat is black',
        'The dog is brown',
        'The fish is orange'
    ]
}


const Dashboard = () => {

    const location = useLocation();
    // here fetch the program list name and content from the server
    const [programName, setProgramName] = useState('Letters');
    const [programContent, setProgramContent] = useState(programContents[programName]);

    // here you can use this variable to render the lesson of sign or braille language
    // eslint-disable-next-line no-unused-vars
    const languageTypeState = location.state?.languageType;


    // eslint-disable-next-line no-unused-vars
    const [score, setScore] = useState(199)

    const navigate = useNavigate();

    const handleRestartLesson = (lessonName) => {
        console.log(`Navigating to lesson: ${lessonName}`);
        navigate(`/lessons`, { state: { lessonName } });
    };

    const handleClick = (name) => {
        setProgramName(name);
        setProgramContent(programContents[name] || []);
    }

    // here change the content
    useEffect(() => {
        console.log('Updated programContent:', programContent);
    }, [programContent]);

    const renderProgramList = () => {
        return programList.map((program, index) => {
            const isDisabled = (score < 200 && program.name === 'Words') || (score < 400 && program.name === 'Sentences');
            return (
                <li
                    className={`bg-white rounded-md ${isDisabled ? ' bg-slate-300' : 'cursor-pointer hover:bg-slate-200'}`}
                    key={index}
                    onClick={() => !isDisabled && handleClick(program.name)}
                >
                    <div className='flex flex-col p-5'>
                        <span className={` flex justify-between text-[20px] ${isDisabled ? 'text-gray-500' : ''}`} style={{ fontWeight: 600 }}>
                            <div>{program.name}</div>
                            <div>{isDisabled && <FaLock className="inline ml-2" />}</div>
                        </span>
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
                                <div className='program-list'>
                                    <span className='text-gray-600 text-[20px] font-bold'>Programs</span>
                                    <ul className='flex flex-col gap-y-2 mt-5'>
                                        {renderProgramList()}
                                    </ul>
                                </div>
                            </Sidebar>
                        </div>
                        <div className='basis-2/3'>
                            <LessonsList programContent={programContent} onRestartLesson={handleRestartLesson} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Dashboard
