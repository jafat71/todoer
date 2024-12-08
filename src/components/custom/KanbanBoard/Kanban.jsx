import { useState, useCallback } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DroppableContainer } from "./DroppableContainer";
import { SortableItem } from "./SortableItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { LucideDelete, LucideEdit2 } from "lucide-react";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";
import SkeletonColumn from "./SkeletonColumn";
import { addUserTask, deleteUserTask, updateUserTask } from "@/lib/actions";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

const Kanban = () => {
    const { isLoading, kanbanObject, setKanbanObject } = useTodoerContext();
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    const buildTaskBodyFromColumn = (task,columnId) => {
        let tempTask = {
            title: task.title,
            doing: false,
            done: false,
        };
        switch (columnId) {
            case "TODO":
                tempTask.doing = false;
                tempTask.done = false;
                break;
            case "DOING":
                tempTask.doing = true;
                tempTask.done = false;
                break;
            case "DONE":
                tempTask.doing = false;
                tempTask.done = true;
                break;
            default:
                break;
        }
        return tempTask;
    }

    const handleAddTask = useCallback(async (task, columnId) => {
        const tmpTask = buildTaskBodyFromColumn(task,columnId);
        return await addUserTask(tmpTask);
    }, []);

    const handleDragEnd = useCallback(async (event) => {
        const { active, over } = event;
        if (!over) return;

        const sourceColumnId = Object.keys(kanbanObject).find((columnId) =>
            kanbanObject[columnId].tasks.find((task) => task.id === active.id)
        );
        const destinationColumnId = over.id;

        if (sourceColumnId && destinationColumnId && sourceColumnId !== destinationColumnId) {
            const sourceTasks = kanbanObject[sourceColumnId].tasks;
            const destinationTasks = kanbanObject[destinationColumnId].tasks;
            const movedTask = sourceTasks.find((task) => task.id === active.id);
            setKanbanObject((prev) => ({
                ...prev,
                [sourceColumnId]: {
                    ...prev[sourceColumnId],
                    tasks: sourceTasks.filter((task) => task.id !== active.id),
                },
                [destinationColumnId]: {
                    ...prev[destinationColumnId],
                    tasks: [...destinationTasks, movedTask],
                },
            }));
            let tmpMovedTask = buildTaskBodyFromColumn(movedTask,destinationColumnId);
            tmpMovedTask.id = movedTask.id;
            try {
                await updateUserTask(tmpMovedTask);   
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }

        setActiveTask(null);
    }, [kanbanObject, setKanbanObject]);

    const handleDragStart = useCallback((event) => {
        const { active } = event;
        setActiveTask(
            kanbanObject[
                Object.keys(kanbanObject).find((columnId) =>
                    kanbanObject[columnId].tasks.find((task) => task.id === active.id)
                )
            ].tasks.find((task) => task.id === active.id)
        );
    }, [kanbanObject]);

    const addNewTask = async () => {
        if (newTaskTitle && selectedColumn) {
            const newTask = { title: newTaskTitle };
            const columnId = Object.keys(kanbanObject).find((columnId) => columnId === selectedColumn);
            try {
                const addedTaskResponse = await handleAddTask(newTask, columnId);

                if (addedTaskResponse && addedTaskResponse.success) {
                    setKanbanObject((prevColumns) => {
                        const updatedTasks = [...prevColumns[selectedColumn].tasks, addedTaskResponse.task];

                        return {
                            ...prevColumns,
                            [selectedColumn]: {
                                ...prevColumns[selectedColumn],
                                tasks: updatedTasks,
                            },
                        };
                    });
                }
            } catch (error) {
                let errorMessage = "Error adding task: \n";
                error.forEach(err => {
                    errorMessage += err.message + "\n";
                });
                alert(errorMessage);
            }

            setNewTaskTitle("");
            setOpenDialog(false);
            setEditTask(null);
        } else {
            alert("Please enter a task title and select a column.");
        }
    };

    const updateTask = async () => {
        if (editTask && selectedColumn) {
            let tmpTask = { 
                ...editTask,
                title: newTaskTitle,
            };
            try {
                const updatedTaskResponse = await updateUserTask(tmpTask);

                if (updatedTaskResponse && updatedTaskResponse.success) {
                    setKanbanObject((prevColumns) => {
                        const updatedTasks = prevColumns[selectedColumn].tasks.map((task) =>
                            task.id === editTask.id ? updatedTaskResponse.task : task
                        );

                        return {
                            ...prevColumns,
                            [selectedColumn]: {
                                ...prevColumns[selectedColumn],
                                tasks: updatedTasks,
                            },
                        };
                    });
                }
            } catch (error) {
                let errorMessage = "Error updating task: \n";
                error.forEach(err => {
                    errorMessage += err.message + "\n";
                });
                alert(errorMessage);
            }

            setNewTaskTitle("");
            setOpenDialog(false);
            setEditTask(null);
        }
    };

    const deleteTask = useCallback(async (taskId, columnId) => {
        setKanbanObject((prevColumns) => ({
            ...prevColumns,
            [columnId]: {
                ...prevColumns[columnId],
                tasks: prevColumns[columnId].tasks.filter((task) => task.id !== taskId),
            },
        }));
        try {
            await deleteUserTask(taskId);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }, [setKanbanObject]);

    const handleAddTaskClick = (columnId) => {
        setSelectedColumn(columnId);
        setEditTask(null);
        setNewTaskTitle("");
        setOpenDialog(true);
    };

    const handleEditTaskClick = (task, columnId) => {
        setSelectedColumn(columnId);
        setEditTask(task);
        setNewTaskTitle(task.title);
        setOpenDialog(true);
    };

    if (isLoading || !kanbanObject) return <SkeletonColumn />;

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="flex w-full h-full overflow-x-auto">
                {Object.entries(kanbanObject).map(([columnId, column]) => (
                    <Card
                        key={columnId}
                        className="flex flex-col flex-1 min-w-[100px] md:min-w-[170px] xl:min-w-[275px] bg-voidBlack"
                    >
                        <CardHeader>
                            <CardTitle className="text-f2green text-2xl">
                                {column.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-hidden p-0">
                            <SortableContext
                                id={columnId}
                                items={column.tasks}
                                strategy={verticalListSortingStrategy}
                            >
                                <DroppableContainer id={columnId}>
                                    {column.tasks.map((task) => (
                                        <SortableItem key={task.id} id={task.id}>
                                            <div className="p-2 w-full my-2 bg-white rounded-md shadow-sm flex flex-col space-y-2">
                                                <div className="text-sm break-words">{task.title}</div>
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        className="w-8"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteTask(task.id, columnId);
                                                        }}
                                                        onPointerDown={(e) => e.stopPropagation()}
                                                    >
                                                        <LucideDelete width={10} />
                                                    </Button>
                                                    <Button
                                                        className="w-8"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditTaskClick(task, columnId);
                                                        }}
                                                        onPointerDown={(e) => e.stopPropagation()}
                                                    >
                                                        <LucideEdit2 width={10} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </SortableItem>
                                    ))}
                                </DroppableContainer>
                            </SortableContext>
                        </CardContent>
                        <Button
                            onClick={() => handleAddTaskClick(columnId)}
                            className="mt-auto bg-fgreen hover:text-white transition-all duration-300  m-2"
                        >
                            <div className="text-black font-semibold text-lg w-full h-full ">
                                Add Task
                            </div>
                        </Button>
                    </Card>
                ))}
            </div>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogTitle>
                    {editTask ? "Edit Task" : "Add New Task"}
                </AlertDialogTitle>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <h3 className="text-lg font-semibold">
                            {editTask ? "Edit Task" : "Add New Task"}
                        </h3>
                    </AlertDialogHeader>

                    <AlertDialogDescription>
                        <Input
                            type="text"
                            placeholder="Task title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                    </AlertDialogDescription>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={editTask ? updateTask : addNewTask}>
                            {editTask ? "Update Task" : "Add Task"}
                        </AlertDialogAction>
                        <Button className="bg-voidBlack hover:text-voidBlack transition-all duration-300" onClick={() => setOpenDialog(false)} variant="outline">
                            Cancel
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DragOverlay>
                {activeTask ? (
                    <div
                        className="p-2 bg-white h-full rounded-md shadow-sm"
                        style={{ opacity: 0.9 }}
                    >
                        {activeTask.title}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Kanban;