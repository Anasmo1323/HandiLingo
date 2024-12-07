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
                img: 'https://images.squarespace-cdn.com/content/v1/5452398fe4b08a9d2089dea2/1416676476031-LX3GW1BIQ5FOEUVOA74V/2014-10-22+16.32.47.jpg',
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
                img: 'https://images.squarespace-cdn.com/content/v1/5452398fe4b08a9d2089dea2/1416676476031-LX3GW1BIQ5FOEUVOA74V/2014-10-22+16.32.47.jpg',
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
                img: 'https://images.squarespace-cdn.com/content/v1/5452398fe4b08a9d2089dea2/1416676476031-LX3GW1BIQ5FOEUVOA74V/2014-10-22+16.32.47.jpg',
                text: 'l'
            },
        ]
    }
};


const quizes = [
    {
        name: "a-d",
        questions: [
            {
                question: {
                    text: "What is the rigth sequence ?",
                    images: [
                        {"a": 'https://i.pinimg.com/474x/7f/80/47/7f8047283f1a5bb1a1365390648d0784.jpg'}, 
                        {"b": 'https://i.pinimg.com/736x/c7/e1/ac/c7e1acb2b0173f1e5be8f00ee6d61048.jpg'}, 
                        {"c": "https://i.pinimg.com/736x/a7/17/35/a717357312492a015e8e5b6c8bc5d3fc.jpg"}, 
                        {"d": "https://images.squarespace-cdn.com/content/v1/5452398fe4b08a9d2089dea2/1416676476031-LX3GW1BIQ5FOEUVOA74V/2014-10-22+16.32.47.jpg"}
                    ]
                },
                options: { "a": 'abcd', 
                    "b": 'bcad', 
                    "c": "cadb", 
                    "d": "dacb" },
                answer: "a",
            },
            {
                question: {
                    text: "What is the rigth sequence ?",
                    images: [
                        {"b": 'https://i.pinimg.com/736x/c7/e1/ac/c7e1acb2b0173f1e5be8f00ee6d61048.jpg'}, 
                        {"c": "https://i.pinimg.com/736x/a7/17/35/a717357312492a015e8e5b6c8bc5d3fc.jpg"}, 
                        {"d": "https://images.squarespace-cdn.com/content/v1/5452398fe4b08a9d2089dea2/1416676476031-LX3GW1BIQ5FOEUVOA74V/2014-10-22+16.32.47.jpg"},
                        {"a": 'https://i.pinimg.com/474x/7f/80/47/7f8047283f1a5bb1a1365390648d0784.jpg'}
                    ],
                },
                options: { "a": 'abcd', 
                    "b": 'bcda', 
                    "c": "cadb", 
                    "d": "dacb" },
                answer: "b",
            },
            
        ],
    }
]

const Lesson = () => {

    const location = useLocation();
    const lessonNameFromState = location.state?.lessonName;
    console.log(`Received lesson name: ${lessonNameFromState}`);
    const initialLessonIndex = lessonNameFromState ? lessons.findIndex(lesson => lesson.name === lessonNameFromState) : 0;

    const [currentLessonIndex, setCurrentLessonIndex] = useState(initialLessonIndex);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const currentLesson = lessons[currentLessonIndex];
    const lessonData = lessonContent[currentLesson.name];

    const [isQuizMode, setIsQuizMode] = useState(false);

    const handleNextSlide = () => {
        const currentLessonImages = lessonContent[currentLesson.name].images;

        if (!isQuizMode) {
            // Handle lesson slides
            if (currentSlideIndex < currentLessonImages.length - 1) {
                setCurrentSlideIndex(currentSlideIndex + 1);
            } else {
                // Switch to quiz mode when the last slide of a lesson is completed
                setIsQuizMode(true);
                setCurrentSlideIndex(0);
            }
        } else {
            // Handle quiz slides
            const currentQuiz = quizes[currentLessonIndex];
            if (currentSlideIndex < currentQuiz.questions.length - 1) {
                setCurrentSlideIndex(currentSlideIndex + 1);
            } else if (currentLessonIndex < lessons.length - 1) {
                // Move to the next lesson group after completing the quiz
                setCurrentLessonIndex(currentLessonIndex + 1);
                setIsQuizMode(false);
                setCurrentSlideIndex(0);
            } else {
                console.log("You have completed all lessons and quizzes!");
            }
        }
    };

    const handlePrevSlide = () => {
        if (isQuizMode) {
            if (currentSlideIndex > 0) {
                setCurrentSlideIndex(currentSlideIndex - 1);
            } else {
                // Go back to the last lesson slide when moving out of quiz mode
                setIsQuizMode(false);
                setCurrentSlideIndex(lessonContent[currentLesson.name].images.length - 1);
            }
        } else {
            if (currentSlideIndex > 0) {
                setCurrentSlideIndex(currentSlideIndex - 1);
            } else if (currentLessonIndex > 0) {
                setCurrentLessonIndex(currentLessonIndex - 1);
                setIsQuizMode(true);
                setCurrentSlideIndex(quizes[currentLessonIndex - 1].questions.length - 1);
            } else {
                console.log("You are at the beginning of the lessons!");
            }
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


    const renderQuizContent = () => {
        const currentQuiz = quizes[currentLessonIndex];
        const currentQuestion = currentQuiz.questions[currentSlideIndex];
    
        return (
            <div className="text-center">
                {/* Display the question text */}
                <p className="text-[30px] font-semibold mt-4">{currentQuestion.question.text}</p>
                
                {/* Display the sequence of images */}
                <div className="flex justify-center gap-4 mt-4">
                    {currentQuestion.question.images.map((imageObj, index) => {
                        const [key, url] = Object.entries(imageObj)[0]; // Extract key and URL
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={url}
                                    alt={key}
                                    className="w-[100px] h-[100px] rounded-md shadow-md"
                                />
                                <p className="mt-2 font-semibold">{key}</p>
                            </div>
                        );
                    })}
                </div>
                
                {/* Display the options as buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    {Object.entries(currentQuestion.options).map(([key, value]) => (
                        <button
                            key={key}
                            className="bg-white text-green-500 font-bold w-[100px] py-3 rounded-md shadow-md text-lg hover:bg-gray-200"
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        );
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
                            <div className="bg-white w-full rounded-md p-5">
                                {isQuizMode ? renderQuizContent() : renderLessonContent()}
                            </div>
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
