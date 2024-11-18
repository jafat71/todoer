const tasks = [
    { id: 'task-1', title: 'Task 1' },
    { id: 'task-2', title: 'Task 2' },
    { id: 'task-3', title: 'Task 3' },
    { id: 'task-4', title: 'Task 4' },
    { id: 'task-5', title: 'Task 5' },
    { id: 'task-6', title: 'Task 6' },
    { id: 'task-7', title: 'Task 7' }
]
export const fetchTasks = async () => {
    
    await setTimeout(() => {
        return tasks    
    }, 2000);

}