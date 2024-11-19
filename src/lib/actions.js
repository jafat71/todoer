const tasks = [
    { id: 'task-1', title: 'Task 1', "doing":false, "done":false},
    { id: 'task-2', title: 'Task 2', "doing":false, "done":false},
    { id: 'task-3', title: 'Task 3', "doing":false, "done":false},
    { id: 'task-4', title: 'Task 4', "doing":false, "done":false},
    { id: 'task-5', title: 'Task 5', "doing":false, "done":false},
    { id: 'task-6', title: 'Task 6', "doing":false, "done":false},
    { id: 'task-7', title: 'Task 7', "doing":false, "done":false}
]
export const fetchTasks = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return tasks
}