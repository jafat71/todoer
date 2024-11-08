import CalendarForm from "@/components/custom/CalendarForm";
import DayCounter from "@/components/custom/DayCounter";
import Kanban from "@/components/custom/Kanban";
import Notes from "@/components/custom/Notes";
import Stats from "@/components/custom/Stats";
import TaskCalendar from "@/components/custom/TaskCalendar";

const Home = () => {
    //TODO: FIX LOCAL COMPONENTS RESPONSIVE
    //TODO: ADD CONTEXT
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <h2 className="text-6xl font-semibold mb-4">TODOER</h2>
            
            <div
                className="border-2 border-slate-200 p-4 rounded-lg
                flex flex-col gap-2 w-full max-w-8xl lg:flex-row"
            >
                <div className="flex flex-row gap-2 w-full lg:w-1/4 lg:flex-col">
                    <CalendarForm className="flex-1" />
                    <DayCounter className="flex-1" />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-2/4">
                    <Kanban className="w-full" />
                    <TaskCalendar className="w-full" />
                </div>

                <div className="flex flex-row gap-2 w-full lg:w-1/4 lg:flex-col">
                    <Stats className="flex-1" />
                    <Notes className="flex-1" />
                </div>
            </div>
        </div>
    );
};

export default Home;
