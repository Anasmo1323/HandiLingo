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

const Sidebar = ({ setSelectedLevel }) => {

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
        <div className='flex flex-col gap-y-10'>
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
        </div>
    );
};

export default Sidebar;