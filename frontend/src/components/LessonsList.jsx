import { FaRedo } from 'react-icons/fa';


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
    },
];

const LessonsList = ({ selectedLevel, onRestartLesson }) => {

    console.log(selectedLevel);

    return lessons.map((lesson, index) => {
        return (
            <div
                key={index}
                className="bg-green-500 p-5 mb-4 rounded-md flex justify-between items-center shadow-md"
            >
                <div className='w-full pr-5'>
                    <h3 className="text-white font-semibold text-[30px]">{lesson.name}</h3>

                    <span className='w-full h-[2px] bg-white inline-block'></span>

                    <div className="flex gap-3">
                        <span className="text-white font-bold text-sm mt-1">
                            Lessons: {lesson.finished}/{lesson.lessonsNum}
                        </span>
                        <span className="text-white font-bold text-sm mt-1">
                            Time: {lesson.time} mins
                        </span>
                    </div>
                </div>

                <button
                    className="bg-white text-green-500 font-bold px-4 py-2 rounded-md shadow-md text-lg hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => onRestartLesson(lesson.name)}
                >
                    <FaRedo />
                    <span>Restart</span>
                </button>
            </div>
        );
    });
};

export default LessonsList;