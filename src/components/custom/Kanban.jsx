import React, { useState } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DroppableContainer } from './DroppableContainer';
import { SortableItem } from './SortableItem';
import { v4 as uuidv4 } from 'uuid';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction
} from "@/components/ui/alert-dialog"; // Shadcn Alert Dialog
import { LucideDelete, LucideEdit2 } from 'lucide-react';

const initialColumns = {
    todo: {
        title: 'To Do',
        tasks: [
            { id: 'task-1', title: 'Task 1' },
            { id: 'task-2', title: 'Task 2' },
        ],
    },
    inProgress: {
        title: 'Going',
        tasks: [
            { id: 'task-3', title: 'Task 3' },
            { id: 'task-4', title: 'Task 4' },
        ],
    },
    done: {
        title: 'Done',
        tasks: [
            { id: 'task-5', title: 'Task 5' },
        ],
    },
};

const Kanban = () => {
    const [columns, setColumns] = useState(initialColumns);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editTask, setEditTask] = useState(null); // Track the task being edited
    const [activeTask, setActiveTask] = useState(null);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const sourceColumnId = Object.keys(columns).find((columnId) =>
            columns[columnId].tasks.find((task) => task.id === active.id)
        );
        const destinationColumnId = over.id;

        if (sourceColumnId && destinationColumnId && sourceColumnId !== destinationColumnId) {
            const sourceTasks = columns[sourceColumnId].tasks;
            const destinationTasks = columns[destinationColumnId].tasks;
            const movedTask = sourceTasks.find((task) => task.id === active.id);

            setColumns((prev) => ({
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
        }

        setActiveTask(null);
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveTask(columns[Object.keys(columns).find((columnId) =>
            columns[columnId].tasks.find((task) => task.id === active.id)
        )].tasks.find((task) => task.id === active.id));
    };

    const addNewTask = () => {
        if (newTaskTitle && selectedColumn) {
            const newTask = {
                id: uuidv4(),
                title: newTaskTitle,
            };

            setColumns((prevColumns) => {
                const updatedTasks = [...prevColumns[selectedColumn].tasks, newTask];

                return {
                    ...prevColumns,
                    [selectedColumn]: {
                        ...prevColumns[selectedColumn],
                        tasks: updatedTasks,
                    },
                };
            });

            setNewTaskTitle('');
            setOpenDialog(false);
            setEditTask(null);
        } else {
            alert('Please enter a task title and select a column.');
        }
    };

    const updateTask = () => {
        if (editTask && selectedColumn) {
            setColumns((prevColumns) => {
                const updatedTasks = prevColumns[selectedColumn].tasks.map((task) =>
                    task.id === editTask.id ? { ...task, title: newTaskTitle } : task
                );

                return {
                    ...prevColumns,
                    [selectedColumn]: {
                        ...prevColumns[selectedColumn],
                        tasks: updatedTasks,
                    },
                };
            });

            setNewTaskTitle('');
            setOpenDialog(false);
            setEditTask(null);
        }
    };

    const deleteTask = (taskId, columnId) => {
        setColumns((prevColumns) => ({
            ...prevColumns,
            [columnId]: {
                ...prevColumns[columnId],
                tasks: prevColumns[columnId].tasks.filter((task) => task.id !== taskId),
            },
        }));
    };

    const handleAddTaskClick = (columnId) => {
        setSelectedColumn(columnId);
        setEditTask(null); // Ensure edit mode is off
        setNewTaskTitle(''); // Clear input for new task
        setOpenDialog(true);
    };

    const handleEditTaskClick = (task, columnId) => {
        setSelectedColumn(columnId);
        setEditTask(task);
        setNewTaskTitle(task.title); // Prefill input with task title
        setOpenDialog(true);
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="flex w-full  overflow-x-auto">
                {Object.entries(columns).map(([columnId, column]) => (
                    <Card
                        key={columnId}
                        className="flex-1 min-w-[100px] md:min-w-[170px] xl:min-w-[200px] bg-gray-100"
                    >
                        <CardHeader>
                            <CardTitle>{column.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-y-auto p-0">
                            <SortableContext id={columnId} items={column.tasks} strategy={verticalListSortingStrategy}>
                                <DroppableContainer id={columnId}>
                                    {column.tasks.map((task) => (
                                        <SortableItem key={task.id} id={task.id}>
                                            <div className="p-2 w-full my-2 bg-white rounded-md shadow-sm flex flex-col space-y-2">
                                                {/* Task title section allowing the text to wrap */}
                                                <div className="text-sm break-words">
                                                    {task.title}
                                                </div>
                                                {/* Action buttons positioned at the bottom of each task item */}
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
                        <Button onClick={() => handleAddTaskClick(columnId)} className="m-2">
                            Add Task
                        </Button>
                    </Card>
                ))}
            </div>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <h3 className="text-lg font-semibold">{editTask ? 'Edit Task' : 'Add New Task'}</h3>
                    </AlertDialogHeader>

                    <AlertDialogDescription>
                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="Task title"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                            />
                        </div>
                    </AlertDialogDescription>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={editTask ? updateTask : addNewTask}>
                            {editTask ? 'Update Task' : 'Add Task'}
                        </AlertDialogAction>
                        <Button onClick={() => setOpenDialog(false)} variant="outline">Cancel</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DragOverlay>
                {activeTask ? (
                    <div className="p-2 bg-white rounded-md shadow-sm" style={{ opacity: 0.9 }}>
                        {activeTask.title}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Kanban;