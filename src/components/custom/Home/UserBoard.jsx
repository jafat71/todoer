/* eslint-disable react/prop-types */

import { Box, Calendar1, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";


const UserBoard = ({ board }) => {
    const tasks = board.tasks ? board.tasks : [];
    const navigate = useNavigate();
    
    // Calculate completed tasks percentage
    const completedTasks = tasks.filter(task => task.completed).length;
    const completionPercentage = tasks.length > 0 
        ? Math.round((completedTasks / tasks.length) * 100) 
        : 0;
    
    return (
        <div 
            className="bg-voidBlack/50 p-4 rounded-lg border border-fgreen/20 hover:border-f2green/50 hover:shadow-lg hover:shadow-fgreen/10 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/kanban/${board.id}`)}
        >
            <div className="flex flex-row items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Box className="text-fgreen" />
                    <h3 className="text-lg font-bold text-white truncate">{board.title}</h3>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    board.completed 
                        ? "bg-green-900/30 text-green-400" 
                        : "bg-amber-900/30 text-yellow-400"
                }`}>
                    {board.completed ? "Completed" : "In Progress"}
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-neutral-800 rounded-full h-2 mb-4">
                <div 
                    className="bg-gradient-to-r from-fgreen to-f2green h-2 rounded-full" 
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>
            <div className="text-xs text-neutral-400 mb-3">
                {completedTasks} of {tasks.length} tasks completed
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-400">
                    <Calendar1 className="h-4 w-4 text-fgreen" />
                    <span>Start: {board.from_date.split("T")[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                    <CalendarClock className="h-4 w-4 text-fgreen" />
                    <span>End: {board.to_date.split("T")[0]}</span>
                </div>
            </div>
        </div>
    );
};

export default UserBoard;
