import CalendarInfo from "@/components/custom/CalendarInfo";
import DayCounter from "@/components/custom/DayCounter";
import Kanban from "@/components/custom/KanbanBoard/Kanban";
import Stats from "@/components/custom/Stats";
import { KANBAN_COLUMNS } from "@/constants";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";
import { fetchUserBoard} from "@/services/actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KanbanBoard = () => {
    const {setKanbanBoard, setDates} = useTodoerContext()
    const {id} = useParams();
    const [board, setBoard] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    const getBoardData = async () => {
        setIsLoading(true);
        try {       
            const board = await fetchUserBoard(id)
            console.log("Board:", board)
            setBoard(board.board)
        const dates = {
            fromDate: board.board.from_date,
            toDate: board.board.to_date
            }
            setDates(dates)
            console.log("Board:", board.board)
            console.log("Tasks:", board.tasks)
            setKanbanBoard(board.tasks)
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching board data:", error);
            setIsLoading(false);
            alert("Error fetching board data");
        }
    }    
    useEffect(() => {
        (async () =>  {
            await getBoardData()
        })()     
    }, []);

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <h2 className="lg:hidden text-6xl font-extrabold mb-4 text-white">KNBNN</h2>
                
                <div
                    className="border-2 border-slate-200 p-4 rounded-lg
                    flex flex-col gap-2 w-full max-w-8xl lg:flex-row"
                >
                    <div className="flex flex-row gap-2 w-full lg:w-1/4 lg:flex-col">
                        <CalendarInfo board={board} isLoading={isLoading} />
                        <DayCounter className="flex-1" />
                    </div>

                    <div className="flex flex-col gap-2 w-full lg:w-3/4">
                        <Kanban className="w-full h-full" boardId={id} />
                    </div>

                    <div className="flex flex-row gap-2 w-full lg:w-1/4 lg:flex-col">
                        <Stats className="flex-1" columns={KANBAN_COLUMNS} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default KanbanBoard;
