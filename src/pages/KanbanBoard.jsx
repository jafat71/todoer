import CalendarForm from "@/components/custom/CalendarForm";
import DayCounter from "@/components/custom/DayCounter";
import Kanban from "@/components/custom/Kanban";
import Stats from "@/components/custom/Stats";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";

const KanbanBoard = () => {
    const {isLoading} = useTodoerContext()
    if(isLoading) return <div>Loading...</div> 
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <h2 className="lg:hidden text-6xl font-extrabold mb-4 text-white">KNBNN</h2>
                
                <div
                    className="border-2 border-slate-200 p-4 rounded-lg
                    flex flex-col gap-2 w-full max-w-8xl lg:flex-row"
                >
                    <div className="flex flex-row gap-2 w-full lg:w-1/4 lg:flex-col">
                        <CalendarForm className="flex-1" />
                        <DayCounter className="flex-1" />
                    </div>

                    <div className="flex flex-col gap-2 w-full lg:w-3/4">
                        <Kanban className="w-full h-full" />
                    </div>

                    <div className="flex flex-row gap-2 w-full lg:w-1/4 lg:flex-col">
                        <Stats className="flex-1" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default KanbanBoard;
