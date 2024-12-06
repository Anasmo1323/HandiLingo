import Footer from '../components/Footer'
import Navbar_ from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';

const lessons = [
    {
        name: "a-d",
        lessonsNum: 10,
        finished: 5,
        time: 15,
    },
    {
        name: "e-h",
        lessonsNum: 10,
        finished: 5,
        time: 15,
    },
    {
        name: "i-l",
        lessonsNum: 10,
        finished: 5,
        time: 15,
    }

];

const lessonContent = {
    'a-d': {
        images: [
            {
                img: 'https://i.pinimg.com/474x/7f/80/47/7f8047283f1a5bb1a1365390648d0784.jpg',
                text: 'a'
            },
            {
                img: 'https://i.pinimg.com/736x/c7/e1/ac/c7e1acb2b0173f1e5be8f00ee6d61048.jpg',
                text: 'b'
            },
            {
                img: 'https://i.pinimg.com/736x/a7/17/35/a717357312492a015e8e5b6c8bc5d3fc.jpg',
                text: 'c'
            },
            {
                img: 'https://www.pinterest.com/pin/11822017763996632/',
                text: 'd'
            },
        ]
    },
    'e-h': {
        images: [
            {
                img: 'https://i.pinimg.com/736x/a7/17/35/a717357312492a015e8e5b6c8bc5d3fc.jpg',
                text: 'e'
            },
            {
                img: 'https://i.pinimg.com/736x/c7/e1/ac/c7e1acb2b0173f1e5be8f00ee6d61048.jpg',
                text: 'f'
            },
            {
                img: 'https://i.pinimg.com/736x/a7/17/35/a717357312492a015e8e5b6c8bc5d3fc.jpg',
                text: 'g'
            },
            {
                img: 'https://www.pinterest.com/pin/11822017763996632/',
                text: 'h'
            },
        ]
    },
    'i-l': {
        images: [
            {
                img: 'https://i.pinimg.com/736x/a7/17/35/a717357312492a015e8e5b6c8bc5d3fc.jpg',
                text: 'i'
            },
            {
                img: 'https://i.pinimg.com/736x/c7/e1/ac/c7e1acb2b0173f1e5be8f00ee6d61048.jpg',
                text: 'g'
            },
            {
                img: 'https://i.pinimg.com/736x/a7/17/35/a717357312492a015e8e5b6c8bc5d3fc.jpg',
                text: 'k'
            },
            {
                img: 'https://www.pinterest.com/pin/11822017763996632/',
                text: 'l'
            },
        ]
    }
};

const Lesson = () => {

    const location = useLocation();
    const lessonNameFromState = location.state?.lessonName;
    console.log(`Received lesson name: ${lessonNameFromState}`);
    const initialLessonIndex = lessonNameFromState ? lessons.findIndex(lesson => lesson.name === lessonNameFromState) : 0;

    const [currentLessonIndex, setCurrentLessonIndex] = useState(initialLessonIndex);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const currentLesson = lessons[currentLessonIndex];
    const lessonData = lessonContent[currentLesson.name];

    const handleNextSlide = () => {
        const currentLessonImages = lessonContent[currentLesson.name].images;

        if (currentSlideIndex < currentLessonImages.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        } else if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
            setCurrentSlideIndex(0);
        } else {
            console.log("You have completed all lessons!");
        }
    };

    const handlePrevSlide = () => {


        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        } else if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
            setCurrentSlideIndex(lessonContent[lessons[currentLessonIndex - 1].name].images.length - 1);
        } else {
            console.log("You are at the beginning of the lessons!");
        }
    };

    const renderLessonContent = () => {
        const currentImage = lessonData.images[currentSlideIndex];
        return (
            <div className="text-center">
                <p className="text-[30px] font-semibold mt-4">{currentImage.text}</p>
                <img
                    src={currentImage.img}
                    alt={currentImage.text}
                    className="w-[500px] h-[500px] mx-auto rounded-lg shadow-md"
                />
            </div>
        );
    };

    const renderLessons = () => {
        return lessons.map((level, index) => (
            <li
                className={`bg-white rounded-md cursor-pointer hover:bg-slate-200 p-4 ${index === currentLessonIndex ? 'ring-2 ring-green-500' : ''
                    }`}
                key={index}
                onClick={() => {
                    setCurrentLessonIndex(index);
                    setCurrentSlideIndex(0);
                }}
            >
                <div className="flex flex-col">
                    <span className="text-[20px]" style={{ fontWeight: 600 }}>
                        {level.name}
                    </span>
                    <span className="text-xs text-slate-400">Progress</span>
                </div>
            </li>
        ));
    };

    return (
        <>
            <Navbar_ />
            <div className="min-h-[100vh]" style={{ backgroundColor: '#f2f2f2' }}>
                <div className="container">
                    <div className="flex gap-x-10 p-5">
                        <div className="basis-1/4">
                            <Sidebar>
                                <div className="level-list">
                                    <span className="text-gray-600 text-[20px] font-bold">Learn to Type</span>
                                    <ul className="flex flex-col gap-y-2 mt-5 max-h-[700px] overflow-y-auto scrollbar-thumb-green-500 scrollbar-track-gray-200 p-1 hide-scrollbar-arrows">
                                        {renderLessons()}
                                    </ul>
                                </div>
                            </Sidebar>
                        </div>

                        <div className="basis-3/4">
                            <div className="bg-white w-full rounded-md p-5">{renderLessonContent()}</div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={handlePrevSlide}
                                    disabled={currentLessonIndex === 0 && currentSlideIndex === 0}
                                    className="bg-white text-green-500 font-bold w-[200px] py-3 rounded-md shadow-md text-lg hover:bg-gray-200"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextSlide}
                                    disabled={
                                        currentLessonIndex === lessons.length - 1 &&
                                        currentSlideIndex === lessonData.images.length - 1
                                    }
                                    className="bg-white text-green-500 font-bold w-[200px] py-3 rounded-md shadow-md text-lg hover:bg-gray-200"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Lesson;
