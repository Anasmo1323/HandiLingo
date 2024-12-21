import { useEffect, useState } from 'react';
import Navbar_ from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LessonsList from '../components/LessonsList';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import httpClient from "../components/httpClient";

const programList = [
    {
        name: 'Letters',
        program_number: 1
    },
    {
        name: 'Words',
        program_number: 2,
    }
];

const Dashboard = () => {
    const location = useLocation();
    const [programInfo, setProgramInfo] = useState({ name: 'Letters', program_number: 1 });
    const [programContent, setProgramContent] = useState([]);
    const languageTypeState = location.state?.languageType;
    const [score, setScore] = useState(1000);
    const [lessons1, setLessons] = useState([]);

    const handleClick = (name, number) => {
        setProgramInfo({
            name,
            program_number: number
        });
        const filteredLessons = lessons1.filter(lesson => lesson.level === number);
        setProgramContent(filteredLessons);
    };

    const fetchLessonData = async () => {
        try {
            const response = await httpClient.get("/lessons");
            const fetchedLessons = response.data.map(lesson => ({
                name: lesson.L_text,
                lessonsNum: lesson.L_no,
                finished: lesson.L_isFinished,
                level: lesson.L_level,
                signs: lesson.L_image,
            }));
            console.log("lessons", fetchedLessons);
            setLessons(fetchedLessons);
            // Set initial program content based on the default programInfo
            const initialFilteredLessons = fetchedLessons.filter(lesson => lesson.level === programInfo.program_number);
            setProgramContent(initialFilteredLessons);
        } catch (error) {
            console.error("Error fetching lessons data:", error);
        }
    };


    useEffect(() => {
        fetchLessonData();

    }, []);

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
                    onClick={() => !isDisabled && handleClick(program.name, program.program_number)}
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
                            <Sidebar>
                                <div className='program-list'>
                                    <span className='text-gray-600 text-[20px] font-bold'>Programs</span>
                                    <ul className='flex flex-col gap-y-2 mt-5'>
                                        {renderProgramList()}
                                    </ul>
                                </div>
                            </Sidebar>
                        </div>
                        <div className='basis-2/3'>
                            <LessonsList programContent={programContent} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;