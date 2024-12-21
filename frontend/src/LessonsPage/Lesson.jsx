import Footer from '../components/Footer'
import httpClient from '../components/httpClient';
import Navbar_ from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const quizes = [
    // ... existing quiz data ...
];

const Lesson = () => {
    const location = useLocation();
    const lessonNumberFromState = location.state?.lessonNumber;
    const lessonLevelFromState = location.state?.level;

    const [flipped, setFlipped] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswerNumber, setCorrectAnswerNumber] = useState({});
    const [reportSlides, setReportSlides] = useState({});
    const [showResults, setShowResults] = useState(false);

    console.log(`Received lesson number: ${lessonNumberFromState}, level: ${lessonLevelFromState}`);
    const initialLessonIndex = lessonNumberFromState ? lessonNumberFromState - 1 : 0;

    const [currentLessonIndex, setCurrentLessonIndex] = useState(initialLessonIndex);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const [lessons, setLessons] = useState([]);
    const [lessonsCopy, setLessonsCopy] = useState([]);
    const [lessonContentCopy, setLessonContentCopy] = useState({});

    const currentLesson = lessonsCopy[currentLessonIndex];
    const lessonData = lessonContentCopy[currentLesson?.name];

    const [isQuizMode, setIsQuizMode] = useState(false);

    const fetchLessonData = async () => {
        try {
            const response = await httpClient.get("/lessons");
            const fetchedLessons = response.data.map(lesson => ({
                name: lesson.L_text.split(' ').slice(1).join('-'),
                lessonsNum: lesson.L_no,
                finished: lesson.L_isFinished,
                level: lesson.L_level,
                signs: lesson.L_image.split(',').map(sign => sign.trim()),
            }));

            console.log("fetchedLessons", fetchedLessons);
            const filteredLessons = fetchedLessons.filter(lesson => lesson.level === lessonLevelFromState);

            setLessons(fetchedLessons);

            // Prepare data for lessonsCopy and lessonContentCopy
            const lessonsCopyData = filteredLessons.map(lesson => ({
                name: lesson.name,
                lessonsNum: lesson.lessonsNum,
                finished: lesson.finished,
                time: 12, // Assuming a default time value
            }));

            const lessonContentCopyData = filteredLessons.reduce((acc, lesson) => {
                acc[lesson.name] = {
                    images: lesson.signs.map(sign => ({
                        img: `path/to/images/${sign}.jpg`, // Assuming a path format for images
                        text: sign.split('_').slice(1).join(' '), // Assuming text format from sign name
                    })),
                };
                return acc;
            }, {});

            setLessonsCopy(lessonsCopyData);
            setLessonContentCopy(lessonContentCopyData);

            // Set the initial lesson index based on the lesson number
            const initialIndex = lessonsCopyData.findIndex(lesson => lesson.lessonsNum === lessonNumberFromState);
            setCurrentLessonIndex(initialIndex !== -1 ? initialIndex : 0);

        } catch (error) {
            console.error("Error fetching lessons data:", error);
        }
    };

    useEffect(() => {
        console.log("fetched here");
        fetchLessonData();
        console.log("lessons", lessons);
    }, [lessonLevelFromState, lessonNumberFromState]);

    useEffect(() => {
        console.log("Updated lessons:", lessons);
        console.log("Updated lessonsCopy:", lessonsCopy);
        console.log("Updated lessonContentCopy:", lessonContentCopy);
    }, [lessons]);

    const [user, setLessonScore] = useState(0);
    useEffect(() => {
        const fetchLessonScore = async () => {
            try {
                const response = await httpClient.get("/@me");
                const FetchedLessonScore = response.data
                setLessonScore(FetchedLessonScore);
            }
            catch (error) {
                console.error("Error fetching lesson score:", error);
            }
        };
        fetchLessonScore(); //use this to get it: user.lesson_score
    }, []);

    const getNextQuestionSign = async () => {
        try {
            const response = await httpClient.get("/next_question_sign");
            if (response.status === 200) {
                console.log(response.data);//replace with actual logic
            } else {
                console.error("Failed to fetch the next question");
            }
        } catch (error) {
            console.error("Error fetching the next question:", error);
        }
    };

    const updateLessonScore = async (userId, newLessonScore) => {
        try {
            const response = await httpClient.post("/update_lesson_score", {
                user_id: userId,
                lesson_score: newLessonScore
            });
            if (response.status === 207) {
                console.log("Lesson score updated successfully");
            } else {
                console.error("Failed to update lesson score");
            }
        } catch (error) {
            console.error("Error updating lesson score:", error);
        }
    };

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    const handleAnswer = (selectedKey) => {
        if (currentSlideIndex in correctAnswerNumber) {
            console.log("Answer for index", currentSlideIndex, "is already stored.");
            return;
        }

        const currentQuestion = quizes[currentLessonIndex].questions[currentSlideIndex];
        const correctKey = currentQuestion.answer;

        const isCorrect = selectedKey === correctKey;

        console.log("Selected Key:", selectedKey);
        console.log("Correct Key:", correctKey);
        console.log("Is Correct:", isCorrect);

        setCorrectAnswerNumber((prev) => ({
            ...prev,
            [currentSlideIndex]: isCorrect,
        }));
        console.log("Stored answer for index:", currentSlideIndex, "isCorrect:", isCorrect);

        setIsCorrect(isCorrect);
        setSelectedAnswer(selectedKey);

        return isCorrect;
    };

    const handleNextSlide = () => {
        setIsCorrect(null);
        setSelectedAnswer(null);

        if (showResults) {
            setShowResults(false);
            setCurrentLessonIndex(currentLessonIndex + 1);
            setCurrentSlideIndex(0);
            setIsQuizMode(false);
            setCorrectAnswerNumber({});
            return;
        }

        if (!isQuizMode) {
            const currentLessonImages = lessonData?.images;

            if (currentSlideIndex < currentLessonImages.length - 1) {
                setCurrentSlideIndex(currentSlideIndex + 1);
                console.log(`Moved to next lesson slide: ${currentSlideIndex + 1}`);
            } else {
                setIsQuizMode(true);
                setCurrentSlideIndex(0);
                console.log(`Completed lesson slides for ${currentLesson.name}, moving to quizzes`);
            }
        } else {
            const currentQuiz = quizes[currentLessonIndex];

            if (currentSlideIndex < currentQuiz.questions.length - 1) {
                setCurrentSlideIndex(currentSlideIndex + 1);
                console.log(`Moved to next quiz slide: ${currentSlideIndex + 1}`);
            } else {
                setReportSlides((prev) => ({
                    ...prev,
                    [currentLesson.name]: correctAnswerNumber,
                }));
                console.log(`Stored results for ${currentLesson.name}:`, correctAnswerNumber);

                setShowResults(true);
                console.log("Showing results slide");
            }
        }
    };

    const handlePrevSlide = () => {
        setIsCorrect(null);
        setSelectedAnswer(null);

        if (showResults) {
            setShowResults(false);
            setIsQuizMode(true);
            setCurrentSlideIndex(quizes[currentLessonIndex].questions.length - 1);
            return;
        }

        if (isQuizMode) {
            if (currentSlideIndex > 0) {
                setCurrentSlideIndex(currentSlideIndex - 1);
            } else {
                setIsQuizMode(false);
                setCurrentSlideIndex(lessonData?.images.length - 1);
            }
        } else {
            if (currentSlideIndex > 0) {
                setCurrentSlideIndex(currentSlideIndex - 1);
            } else if (currentLessonIndex > 0) {
                setCurrentLessonIndex(currentLessonIndex - 1);
                setIsQuizMode(true);
                setCurrentSlideIndex(quizes[currentLessonIndex - 1].questions.length - 1);
                setCorrectAnswerNumber(reportSlides[lessonsCopy[currentLessonIndex - 1].name] || {});
                setShowResults(true);
            } else {
                console.log("You are at the beginning of the lessons!");
            }
        }
    };

    const renderLessonContent = () => {
        if (!lessonData) {
            return <div>Loading...</div>;
        }

        const currentImage = lessonData.images[currentSlideIndex];
        return (
            <div
                className="flip-card-container flex justify-center items-center "
                onClick={handleCardClick}
            >
                <div className={` cursor-pointer flip-card ${flipped ? 'flipped' : ''}`}>
                    <div className="flip-card-front">
                        <img
                            src={currentImage.img}
                            alt={currentImage.text}
                            className="w-[500px] h-[500px] mx-auto rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flip-card-back  border-[30px] border-[#4eac6d] rounded-lg shadow-md p-5">
                        <p className="text-[100px] font-semibold mt-4">{currentImage.text.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderLessons = () => {
        return lessonsCopy.map((level, index) => (
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
                <p className="text-[30px] font-semibold mt-4">{currentQuestion.question.text}</p>

                <div className="flex justify-center gap-4 mt-4">
                    {currentQuestion.question.images.map((imageObj, index) => {
                        const [key, url] = Object.entries(imageObj)[0];
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={url}
                                    alt={key}
                                    className="w-[200px] h-[200px] rounded-md shadow-md"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col justify-center items-start mt-6">
                    {Object.entries(currentQuestion.options).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex justify-center items-center p-5"
                            onClick={() => handleAnswer(key)}
                        >
                            <p className="font-bold mr-4">{`${key.toUpperCase()} )`}</p>
                            <button
                                className={`bg-white text-green-500 font-bold w-[100px] py-3 rounded-md shadow-md text-lg hover:bg-gray-200 ${selectedAnswer === key ? (isCorrect ? 'border-2 border-green-500' : 'border-2 border-red-500') : ''}`}
                            >
                                {value}
                            </button>
                            {selectedAnswer === key && isCorrect && (
                                <span className="ml-4 text-green-500 font-bold">Correct!</span>
                            )}
                            {selectedAnswer === key && !isCorrect && (
                                <span className="ml-4 text-red-500 font-bold">Incorrect!</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderQuizResults = () => {
        const results = reportSlides[currentLesson.name] || {};
        const correctAnswers = Object.values(results).filter(isCorrect => isCorrect).length;
        const incorrectAnswers = Object.values(results).filter(isCorrect => !isCorrect).length;

        return (
            <div className="flex flex-col justify-center items-center mt-6">
                <h2 className="text-[30px] font-semibold">Quiz Results</h2>
                <div className='w-full text-lg p-5 flex justify-between items-center'>
                    <span>Correct Answers Number: {correctAnswers}</span>
                    <span>Incorrect Answers Number: {incorrectAnswers}</span>
                </div>
                <ul className="mt-4">
                    {Object.entries(results).map(([index, isCorrect], idx) => (
                        <li key={idx} className="text-[20px]">
                            Question {parseInt(index) + 1}: {isCorrect ? 'Correct' : 'Incorrect'}
                        </li>
                    ))}
                </ul>
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
                                {showResults ? renderQuizResults() : (isQuizMode ? renderQuizContent() : renderLessonContent())}
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={handlePrevSlide}
                                    disabled={currentLessonIndex === 0 && currentSlideIndex === 0 && !isQuizMode}
                                    className="bg-white text-green-500 font-bold w-[200px] py-3 rounded-md shadow-md text-lg hover:bg-gray-200"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNextSlide}
                                    disabled={
                                        currentLessonIndex === lessonsCopy.length - 1 &&
                                        currentSlideIndex === (isQuizMode ? quizes[currentLessonIndex].questions.length - 1 : lessonData?.images.length - 1)
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