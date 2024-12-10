/* eslint-disable react/prop-types */
import { useEffect} from 'react'
import { AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getPriorityColor, PRIORITY_OPTIONS } from '@/constants'

export const KanbanItemAlertDialog = ({ openDialog, setOpenDialog, editTask, updateTask, addNewTask, newTaskTitle, setNewTaskTitle, currentTask, selectedPriority, setSelectedPriority }) => {

    useEffect(() => {
        setSelectedPriority(currentTask?.priority || PRIORITY_OPTIONS[0]);
    }, [currentTask, setSelectedPriority]);

    return (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTitle>
                {""}
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
                    <div>
                        <div className="text-lg font-semibold text-f2green mb-2">Priority</div>
                        <div className="flex w-full">
                            {PRIORITY_OPTIONS.map((priority) => (
                                <div key={priority} className="flex flex-col items-center w-1/3 h-10">
                                    <button key={priority}
                                        className={`flex justify-center w-full h-24 rounded-sm
                                        transition-all duration-300 border-2 border-f2green 
                                    ${getPriorityColor(priority)}
                                    ${selectedPriority === priority ? "-translate-y-1" : ""}
                                    `} onClick={() => setSelectedPriority(priority)}>
                                    </button>
                                    <div className={`text-xs font-semibold text-fgreen    
                                    // ${selectedPriority === priority ? "text-white scale-125" : ""}
                                    `}>{priority}</div>
                                </div>
                            ))}
                        </div>
                    </div>
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
        </AlertDialog>)
}

export default KanbanItemAlertDialog