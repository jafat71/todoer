import CalendarInfo from "@/components/custom/CalendarInfo";
import DayCounter from "@/components/custom/DayCounter";
import Kanban from "@/components/custom/KanbanBoard/Kanban";
import Stats from "@/components/custom/Stats";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";
import { deleteUserBoard, fetchCompleteUserBoard } from "@/services/actions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Trash, Loader2, Dices } from "lucide-react";
import usePDFMake from "@/hooks/use-PDFMake";
import { useUserContext } from "@/contexts/UserContext/UserContext";
import blurBackground from "@/assets/blurs.webp";

const KanbanBoard = () => {
    const { setKanbanBoard, setDates, kanbanObject, setRandomTask } = useTodoerContext();
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { generarPDF } = usePDFMake(board);
    const { isLoading: isUserLoading } = useUserContext();

    const navigate = useNavigate();

    const getBoardData = async () => {
        setIsLoading(true);
        try {
            const board = await fetchCompleteUserBoard(id);
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
            alert("Error loading board data");
        }
    };

    const handleDeleteBoard = async () => {
        //Confirmar eliminación
        if (window.confirm("¿Are you sure you want to delete this board?")) {
            try {
                await deleteUserBoard(id);
                navigate("/");
            } catch (error) {
                console.error("Error deleting board:", error);
                alert("Error deleting board");
            }
        }
    };

    const handleGetRandomTask = () => {
        //Choose task from TODO - DOING column on Kanban Board Object
        const possibleTasks = [...kanbanObject.DOING.tasks, ...kanbanObject.TODO.tasks];
        if (possibleTasks.length === 0) {
            alert("No tasks in TODO or DOING columns found");
            return;
        }
        const randomTask = possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
        setRandomTask(randomTask);
    };

    useEffect(() => {
        if (!isUserLoading) {
            (async () => {
                await getBoardData();
            })();
        }
    }, [isUserLoading]);

    if (isUserLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-f2green mx-auto mb-4" />
                    <p className="text-white text-lg">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[2400px] mx-auto relative px-4">
            {/* Background Blur */}
            <div
                className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${blurBackground})` }}
            />

            <div className="relative mb-4  z-10 flex flex-col items-center justify-center  rounded-lg">

                <div className="w-full flex flex-row justify-between my-2 gap-2">
                    <div className="flex flex-row gap-2">
                        <button
                            onClick={() => navigate("/home")}
                            className="bg-f2green  text-black px-2 py-1 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300"
                        >
                            <ArrowLeft className="w-6 h-6 text-black" />
                        </button>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button
                            onClick={handleGetRandomTask}
                            className="bg-f2green  text-black px-2 py-1 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300"
                        >
                            <Dices className="w-6 h-6 text-black" />
                        </button>
                        
                        <button
                            onClick={generarPDF}
                            className="bg-f2green  text-black px-2 py-1 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300"
                        >
                            <Download className="w-6 h-6 text-black" />
                        </button>
                        <button
                            onClick={handleDeleteBoard}
                            className="bg-red-500  text-black px-2 py-1 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300"
                        >
                            <Trash className="w-6 h-6 text-black" />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="w-full flex items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-f2green" />
                    </div>
                ) : (
                    <div className="flex flex-col w-full lg:flex-row my-4
                        bg-voidBlack rounded-md shadow-lg shadow-f2green/20
                    ">
                        <div className="flex flex-col sm:flex-row  w-full lg:w-1/4 lg:flex-col">
                            <CalendarInfo board={board} isLoading={isLoading} />
                            <DayCounter />

                            <div className="hidden lg:flex w-full justify-center my-4">
                                <div className="space-y-2">
                                    <div className="w-2 h-2 rounded-full bg-fgreen"></div>
                                    <div className="w-2 h-2 rounded-full bg-fgreen"></div>
                                    <div className="w-2 h-2 rounded-full bg-fgreen"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full lg:w-3/4 ">
                            <Kanban boardId={id} />
                        </div>

                        <div className="flex flex-row w-full lg:w-1/4 lg:flex-col">
                            <Stats />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanBoard;
