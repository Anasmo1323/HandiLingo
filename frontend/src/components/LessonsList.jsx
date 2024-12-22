import {FaPlay, FaRedo} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LessonsList = ({ userTotalScore,programContent }) => {
    const navigate = useNavigate();

    const handleRestartLesson = (lessonNumber, level) => {
        console.log(`Navigating to lesson: ${lessonNumber}, level: ${level}`);
        navigate(`/lessons`, { state: { lessonNumber, level } });
    };

    console.log("program content", programContent);

    return programContent.map((content, index) => {
        const isDisabled =userTotalScore < content.lessonsNum * 1000
        // userData.total_score < level.lessonsNum * 1000;
        return (
            <div
            key={index}
            className={`bg-green-500 p-5 mb-4 rounded-md flex justify-between items-center shadow-md ${isDisabled ? 'bg-slate-400 ' : 'cursor-pointer hover:bg-green-400'}`}
        >
            <div className="w-full pr-5">
                <h3 className="text-white font-semibold text-[30px]">{content.name ? content.name.split(' ').slice(1).join('-') : "no content"}</h3>
        
                <span className="w-full h-[2px] bg-white inline-block mb-2"></span>
        
                <div className="flex gap-3">
                    <span className="text-white font-bold text-sm mt-1">
                        {/* Additional details */}
                    </span>
                </div>
            </div>
        
            <button
                className={`bg-white text-green-500 font-bold px-4 py-2 rounded-md shadow-md text-lg hover:bg-gray-200 flex items-center gap-2 ${isDisabled ? ' opacity-50' : ''}`}
                onClick={() => !isDisabled && handleRestartLesson(content.lessonsNum, content.level)}
                disabled={isDisabled}
            >
                <FaPlay />
                <span>Start</span>
            </button>
        </div>
        );
    });
};

export default LessonsList;