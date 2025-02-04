/* eslint-disable react/prop-types */

import { Box, Calendar1, CalendarClock, Check, ListChecks } from "lucide-react";


const UserBoard = ({ board }) => {
    const tasks = board.tasks ? board.tasks : [];
    return (
        <div className="p-2 my-2 border-2 border-gray-300 rounded-md w-full">
            <div className="flex flex-row items-center justify-between">
                <Box />
                <div className="text-xl font-bold text-fgreen">{board.title}</div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <Calendar1 />
                <div className="text-sm font-semibold ml-2">
                    {board.from_date.split("T")[0]}
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <CalendarClock />
                <div className="text-sm font-semibold ml-2">
                    {board.to_date.split("T")[0]}
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <ListChecks />
                <div className="text-sm font-semibold ml-2">
                    {tasks.length} tasks
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <Check />
                <div className="text-sm font-semibold ml-2 text-fgreen">
                    Status: {board.completed ? "Completed" : "In Progress"}
                </div>
            </div>

        </div>
    );
};
export default UserBoard;
