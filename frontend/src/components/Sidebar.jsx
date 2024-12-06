
const Sidebar = ({children }) => {

    

    return (
        <div className={`flex flex-col gap-y-10 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200 `} >
            {children}
        </div>
    );
};

export default Sidebar;