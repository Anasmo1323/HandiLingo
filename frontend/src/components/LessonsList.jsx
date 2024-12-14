import { FaRedo } from 'react-icons/fa';





const LessonsList = ({ onRestartLesson, programContent }) => {


    return programContent.map((content, index) => {
        return (
            <div
                key={index}
                className="bg-green-500 p-5 mb-4 rounded-md flex justify-between items-center shadow-md"
            >
                <div className="w-full pr-5">
                    <h3 className="text-white font-semibold text-[30px]">{content}</h3>

                    <span className="w-full h-[2px] bg-white inline-block mb-2"></span>

                    <div className="flex gap-3">
                        <span className="text-white font-bold text-sm mt-1">
                            {/* Additional details */}
                        </span>
                    </div>
                </div>

                <button
                    className="bg-white text-green-500 font-bold px-4 py-2 rounded-md shadow-md text-lg hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => onRestartLesson(content)}
                >
                    <FaRedo />
                    <span>Restart</span>
                </button>
            </div>
        );
    });
};

export default LessonsList;