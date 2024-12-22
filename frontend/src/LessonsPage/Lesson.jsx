import Footer from '../components/Footer'
import httpClient from '../components/httpClient';
import Navbar_ from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';


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
    const [showModal, setShowModal] = useState(false); // State variable for modal visibility

    const [currentLessonIndex, setCurrentLessonIndex] = useState(lessonNumberFromState ? lessonNumberFromState - 1 : 0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

    const [lessons, setLessons] = useState([]);
    const [lessonsCopy, setLessonsCopy] = useState([]);
    const [lessonContentCopy, setLessonContentCopy] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(null); // Store the current question

    const currentLesson = lessonsCopy[currentLessonIndex];
    const lessonData = lessonContentCopy[currentLesson?.name];

    const [isQuizMode, setIsQuizMode] = useState(false);
    const [userData, setUserData] = useState({});
    const [lessonScore, setLessonScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [stage, setStage] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await httpClient.get("/@me");
                setUserData(response.data);
                setLessonScore(response.data.lesson_score);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

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

            const filteredLessons = fetchedLessons.filter(lesson => lesson.level === lessonLevelFromState);

            setLessons(fetchedLessons);

            const lessonsCopyData = filteredLessons.map(lesson => ({
                name: lesson.name,
                lessonsNum: lesson.lessonsNum,
                finished: lesson.finished,
                time: 12,
            }));

            const lessonContentCopyData = filteredLessons.reduce((acc, lesson) => {
                acc[lesson.name] = {
                    images: lesson.signs.map(sign => ({
                        img: `./Data/Signs/${sign}.png`,
                        text: sign.split('_').slice(1).join(' '),
                    })),
                };
                return acc;
            }, {});

            setLessonsCopy(lessonsCopyData);
            setLessonContentCopy(lessonContentCopyData);

            const initialIndex = lessonsCopyData.findIndex(lesson => lesson.lessonsNum === lessonNumberFromState);
            setCurrentLessonIndex(initialIndex !== -1 ? initialIndex : 0);

        } catch (error) {
            console.error("Error fetching lessons data:", error);
        }
    };

    useEffect(() => {
        fetchLessonData();
        // updateStage(userData.id, currentLessonIndex);
    }, [lessonLevelFromState, lessonNumberFromState]);

    useEffect(() => {
        console.log("Updated lessons:", lessons);
        console.log("Updated lessonsCopy:", lessonsCopy);
        console.log("Updated lessonContentCopy:", lessonContentCopy);
    }, [lessons]);

    useEffect(() => {
        console.log("users:", userData);
    }, [userData]);

    const getNextQuestionSign = async () => {
        try {
            const response = await httpClient.get("/next_question_sign");
            if (response.status === 200) {
                console.log("Fetched question:", response.data);
                const newQuestion = { ...response.data, selectedAnswer: null };
                setCurrentQuestion(newQuestion);
                setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
            } else {
                console.error("Failed to fetch the next question");
            }
        } catch (error) {
            console.error("Error fetching the next question:", error);
        }
    };

    const getNextQuestionBraille = async () => {
        try {
            const response = await httpClient.get("/next_question_braille");
            if (response.status === 200) {
                console.log("Fetched question:", response.data);
                const newQuestion = { ...response.data, selectedAnswer: null };
                setCurrentQuestion(newQuestion);
                setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
            } else {
                console.error("Failed to fetch the next question");
            }
        } catch (error) {
            console.error("Error fetching the next question:", error);
        }
    };



    const updateLessonScore = async (userId, newLessonScore) => {
        try {
            console.log("Updating lesson score in database to:", newLessonScore);
            const response = await httpClient.post("/update_lesson_score", {
                user_id: userId,
                lesson_score: newLessonScore
            });
            if (response.status === 207) {
                console.log("Lesson score updated successfully");
                setLessonScore(newLessonScore);
            } else {
                console.error("Failed to update lesson score");
            }
        } catch (error) {
            console.error("Error updating lesson score:", error);
        }
    };

    const updateTotalScore = async (userId, newTotalScore) => {
        try {
            const response = await httpClient.post("/update_total_score", {
                user_id: userId,
                total_score: newTotalScore
            });
            if (response.status === 207) {
                console.log("Total score updated successfully");
                setTotalScore(newTotalScore);
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    total_score: newTotalScore,
                }));
            } else {
                console.error("Failed to update total score");
            }
        } catch (error) {
            console.error("Error updating total score:", error);
        }
    };

    const updateStage = async (userId, newStage) => {
        try {
            const response = await httpClient.post("/update_stage", {
                user_id: userId,
                stage: newStage
            });
            if (response.status === 207) {
                console.log("Stage updated successfully");
                setStage(newStage);
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    stage: newStage,
                }));
            } else {
                console.error("Failed to update stage");
            }
        } catch (error) {
            console.error("Error updating stage:", error);
        }
    };


    useEffect(() => {
        console.log("Updated userData:", userData);
    }, [userData]);

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    const handleAnswer = async (selectedKey) => {
        if (selectedAnswer !== null) {
            console.log("Answer for this question is already stored.");
            return;
        }

        const correctKey = `Q_${currentQuestion.Q_answer}`;

        console.log("Selected answer:", selectedKey);
        console.log("Correct answer:", correctKey);

        const isCorrect = selectedKey === correctKey;

        setCorrectAnswerNumber((prev) => ({
            ...prev,
            [currentQuestionIndex]: isCorrect,
        }));

        setIsCorrect(isCorrect);

        console.log("Selected answer number:", selectedKey);
        console.log("Correct answer number:", correctKey);
        setSelectedAnswer(selectedKey);

        // Store the result in reportSlides
        setReportSlides((prev) => ({
            ...prev,
            [currentLesson.name]: {
                ...prev[currentLesson.name],
                [currentQuestionIndex]: isCorrect,
            },
        }));

        // Update the selected answer for the current question
        setQuestions(prevQuestions => prevQuestions.map((q, index) =>
            index === currentQuestionIndex ? { ...q, selectedAnswer: selectedKey } : q
        ));

        if (isCorrect) {
            const newLessonScore = lessonScore + 100; // Assuming each correct answer gives 10 points
            console.log("Updating lesson score to:", newLessonScore);
            await updateLessonScore(userData.id, newLessonScore);
        }

        return isCorrect;
    };

    const handleNextSlide = async () => {
        if (isQuizMode && selectedAnswer === null && !showResults) {
            console.log("Please answer the question before proceeding to the next one.");
            return;
        }

        setIsCorrect(null);

        if (showResults) {
            const nextLessonIndex = currentLessonIndex + 1;
            const nextLesson = lessonsCopy[nextLessonIndex];

            if (nextLesson && userData.total_score < nextLesson.lessonsNum * 1000) {
                setShowModal(true); // Show modal if next lesson is locked
                return;
            }

            setShowResults(false);
            setCurrentLessonIndex(nextLessonIndex);

            // await updateStage(userData.id, nextLessonIndex);

            setCurrentSlideIndex(0);
            setIsQuizMode(false);
            setCorrectAnswerNumber({});
            setLessonScore(0); // Reset lesson score
            setQuestions([]); // Reset questions
            setSelectedAnswer(null); // Reset selected answer
            console.log("Resetting lesson score to 0");
            await updateLessonScore(userData.id, 0); // Update lesson score to 0

            if (nextLesson && nextLesson.lessonsNum > userData.stage) {
            //     if(lessonLevelFromState === 1){
            //     await updateStage(userData.id, nextLesson.lessonsNum);
            // }
            //     else if (lessonLevelFromState === 2){
            //         await updateStage(userData.id, nextLesson.lessonsNum+10);
            //     }
            //     else if (lessonLevelFromState === 3){
            //         await updateStage(userData.id, nextLesson.lessonsNum+20);
            //     }
                }
            return;
        }

        if (!isQuizMode) {
            const currentLessonImages = lessonData?.images;
                // if(lessonLevelFromState === 1){
                //     await updateStage(userData.id, lessonsCopy[currentLessonIndex]?.lessonsNum);
                // }
                // else if (lessonLevelFromState === 2){
                // await updateStage(userData.id, lessonsCopy[currentLessonIndex]?.lessonsNum+10);
                // }
                // else if (lessonLevelFromState === 3) {
                //     await updateStage(userData.id, lessonsCopy[currentLessonIndex]?.lessonsNum + 20);
                // }
            if (currentSlideIndex < currentLessonImages.length - 1) {
                setCurrentSlideIndex(currentSlideIndex + 1);
            } else {
                setIsQuizMode(true);
                setCurrentSlideIndex(0);
                setCurrentQuestionIndex(0);
                await getNextQuestionSign();
            }
        } else {
            if (currentQuestionIndex < 9) { // 10 questions per lesson
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(questions[currentQuestionIndex + 1]?.selectedAnswer || null); // Retrieve the selected answer for the next question
                await getNextQuestionSign();
            } else {
                setShowResults(true);
                setLessonScore(0); // Reset lesson score
                setQuestions([]); // Reset questions
                setSelectedAnswer(null); // Reset selected answer
                console.log("Resetting lesson score to 0");
                await updateLessonScore(userData.id, 0); // Update lesson score to 0

                // Calculate total score
                const correctAnswers = Object.values(reportSlides[currentLesson.name] || {}).filter(isCorrect => isCorrect).length;
                const newTotalScore = userData.total_score + (correctAnswers * 100);

                console.log("Correct answers:", correctAnswers);
                console.log("New total score:", newTotalScore);

                // Update total score
                await updateTotalScore(userData.id, newTotalScore);

                // Update stage if the current lesson number is greater than the user's current stage
                if (lessonsCopy[currentLessonIndex]?.lessonsNum > userData.stage && newTotalScore >= lessonsCopy[currentLessonIndex]?.lessonsNum * 1000) {
                // if(lessonLevelFromState === 1){
                //     await updateStage(userData.id, lessonsCopy[currentLessonIndex]?.lessonsNum);
                // }
                // else if (lessonLevelFromState === 2){
                // await updateStage(userData.id, lessonsCopy[currentLessonIndex]?.lessonsNum+10);
                // }
                // else if (lessonLevelFromState === 3){
                // await updateStage(userData.id, lessonsCopy[currentLessonIndex]?.lessonsNum+20);
                // }
                }
            }
        }
    };

    const handlePrevSlide = () => {
        setIsCorrect(null);

        if (showResults) {
            setShowResults(false);
            setIsQuizMode(true);
            setCurrentSlideIndex(quizes[currentLessonIndex].questions.length - 1);
            return;
        }

        if (isQuizMode) {
            if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setCurrentQuestion(questions[currentQuestionIndex - 1]);
                setSelectedAnswer(questions[currentQuestionIndex - 1]?.selectedAnswer || null); // Retrieve the selected answer for the previous question
            } else {
                setIsQuizMode(false);
                setCurrentSlideIndex(lessonData?.images.length - 1);
            }
        } else {
            if (currentSlideIndex > 0) {
                setCurrentSlideIndex(currentSlideIndex - 1);
            } else if (currentLessonIndex > 0) {
                setCurrentLessonIndex(currentLessonIndex - 1);

                // updateStage(userData.id, currentLessonIndex - 1);
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
                            className="w-[350px] h-[500px] mx-auto rounded-lg shadow-md"
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
    return lessonsCopy.map((level, index) => {
        const isDisabled = userData.total_score < level.lessonsNum * 1000;

        return (
            <li
                className={`bg-white flex justify-between items-center rounded-md ${isDisabled ? 'bg-gray-300 ' : 'cursor-pointer hover:bg-slate-200'} p-4 ${index === currentLessonIndex ? 'ring-2 ring-green-500' : ''}`}
                key={index}
                onClick={async () => {
                    if (!isDisabled) {
                        setCurrentLessonIndex(index);
                        setCurrentSlideIndex(0);
                    if(lessonLevelFromState === 1){
                        await updateStage(userData.id, index+1);
                    }
                    else if (lessonLevelFromState === 2){
                    await updateStage(userData.id, index+10);
                    }
                    else if (lessonLevelFromState === 3){
                    await updateStage(userData.id, index+20);
                    }
                    }
                }}
            >
                <div className="flex flex-col">
                    <span className="text-[20px]" style={{ fontWeight: 600 }}>
                        {level.name}
                    </span>
                    <span className="text-xs text-slate-600">Progress</span>
                </div>
                {isDisabled && (
                    <div className="flex items-center justify-center mt-2">
                        <FaLock className="text-gray-500" />
                    </div>
                )}
            </li>
        );
    });
};
    const renderQuizContent = () => {
        if (!currentQuestion) {
            return <div>Loading...</div>;
        }

        const { Q_text, Q_image, Q_answer, ...rest } = currentQuestion;
        const options = Object.keys(rest)
            .filter(key => key.startsWith('Q_A'))
            .reduce((obj, key) => {
                obj[key] = rest[key];
                return obj;
            }, {});
        const images = Q_image.split(',').map(img => img.trim());

        console.log("Current question:", currentQuestion);
        console.log("Options:", options);

        return (
            <div className="text-center">
                <p className="text-[30px] font-semibold mt-4">{Q_text}</p>

                <div className="flex justify-center gap-4 mt-4">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={`./Data/Signs/${img}.png`}
                            alt={img}
                            className="w-[200px] h-[200px] rounded-md shadow-md"
                        />
                    ))}
                </div>

                <div className="flex flex-col justify-center items-start mt-6">
                    {Object.entries(options).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex justify-center items-center p-5"
                            onClick={() => handleAnswer(key)}
                        >
                            <p className="font-bold mr-4">{`${key.slice(-1)} )`}</p>
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

    const renderModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 py-10 rounded-md shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Lesson Locked</h2>
                <p className="mb-4">You need more points to unlock the next lesson.</p>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );

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
                                        currentSlideIndex === (isQuizMode ? 9 : lessonData?.images.length - 1)
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

            {showModal && renderModal()}

            <Footer />
        </>
    );
};

export default Lesson;