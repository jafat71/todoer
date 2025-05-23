/* eslint-disable react/prop-types */
import { useEffect} from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getPriorityColor, PRIORITY_OPTIONS } from '@/constants'

export const KanbanItemAlertDialog = ({ openDialog, setOpenDialog, editTask, updateTask, addNewTask, newTaskTitle, setNewTaskTitle, currentTask, selectedPriority, setSelectedPriority }) => {

    useEffect(() => {
        setSelectedPriority(currentTask?.priority || PRIORITY_OPTIONS[0]);
    }, [currentTask, setSelectedPriority]);

    return (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
                <AlertDialogHeader>
                    <h3 className="text-base sm:text-lg font-semibold">
                        {editTask ? "Edit Task" : "Add New Task"}
                    </h3>
                </AlertDialogHeader>

                <AlertDialogDescription className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full"
                    />
                    <div className="space-y-2">
                        <div className="text-sm sm:text-base font-semibold text-f2green">Priority</div>
                        <div className="flex w-full gap-2">
                            {PRIORITY_OPTIONS.map((priority) => (
                                <div key={priority} className="flex flex-col items-center flex-1">
                                    <button
                                        className={`flex justify-center w-full h-6 sm:h-8 rounded-sm
                                        transition-all duration-300 border-2 border-f2green 
                                        ${getPriorityColor(priority)}
                                        ${selectedPriority === priority ? "-translate-y-1" : ""}
                                        `} 
                                        onClick={() => setSelectedPriority(priority)}
                                    >
                                    </button>
                                    <div className="text-xs font-semibold text-fgreen mt-1">
                                        {priority}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AlertDialogDescription>

                <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                    <AlertDialogAction 
                        onClick={editTask ? updateTask : addNewTask}
                        className="w-full sm:w-auto"
                    >
                        {editTask ? "Update Task" : "Add Task"}
                    </AlertDialogAction>
                    <Button 
                        className="w-full sm:w-auto bg-voidBlack hover:text-voidBlack transition-all duration-300" 
                        onClick={() => setOpenDialog(false)} 
                        variant="outline"
                    >
                        Cancel
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default KanbanItemAlertDialog