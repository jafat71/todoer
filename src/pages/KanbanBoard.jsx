import CalendarInfo from "@/components/custom/CalendarInfo";
import DayCounter from "@/components/custom/DayCounter";
import Kanban from "@/components/custom/KanbanBoard/Kanban";
import Stats from "@/components/custom/Stats";
import { KANBAN_COLUMNS } from "@/constants";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";
import { deleteUserBoard, fetchCompleteUserBoard } from "@/services/actions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Download, Trash } from "lucide-react";
import usePDFMake from "@/hooks/use-PDFMake";
import { useUserContext } from "@/contexts/UserContext/UserContext";

const KanbanBoard = () => {
    const { setKanbanBoard, setDates} = useTodoerContext();
    const {token} = useUserContext()
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { generarPDF } = usePDFMake(board);

    const navigate = useNavigate();

    const getBoardData = async () => {
        setIsLoading(true);
        try {
            const board = await fetchCompleteUserBoard(token,id);
            setBoard(board.board);
            const dates = {
                fromDate: board.board.from_date,
                toDate: board.board.to_date
            };
            setDates(dates);
            setKanbanBoard(board.tasks);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching board data:", error);
            setIsLoading(false);
            alert("Error fetching board data");
        }
    };

    const handleDeleteBoard = async () => {
        //Confirmar eliminación
        if (window.confirm("Are you sure you want to delete this board?")) {    
            try {
                await deleteUserBoard(id);
                navigate("/");
        } catch (error) {
            console.error("Error deleting board:", error);
            alert("Error deleting board");
        }
    };
    }

    useEffect(() => {
        (async () => {
            await getBoardData();
        })();
    }, []);

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center px-4 border-t-2 border-slate-200 p-4 rounded-lg">
                <h2 className="lg:hidden text-6xl font-extrabold mb-4 text-white">KNBNN</h2>

                <div className="w-full flex flex-row justify-end my-2 gap-2">
                    <button
                        onClick={handleDeleteBoard}
                        className="bg-f2green  text-black px-2 py-1 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300"
                    >
                        <Trash className="w-6 h-6 text-black" />
                    </button>
                    <button
                        onClick={generarPDF}
                        className="bg-f2green  text-black px-2 py-1 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300"
                    >
                        <Download className="w-6 h-6 text-black" />
                    </button>
                </div>

                <div
                    className=" flex flex-col gap-2 w-full max-w-8xl lg:flex-row"
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
