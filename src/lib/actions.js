
const noLoggedExampleTasks = [
    { id: 'task-1', title: 'Water the plants 🌱', doing: true, done: false },
    { id: 'task-2', title: 'Go for a run 🏃‍♂️', doing: false, done: false },
    { id: 'task-3', title: 'Read a book 📚', doing: false, done: true },
    { id: 'task-4', title: 'Write in the journal ✍️', doing: false, done: false },
    { id: 'task-5', title: 'Cook dinner 🍳', doing: false, done: true },
    { id: 'task-6', title: 'Walk the dog 🐕', doing: true, done: false },
    { id: 'task-7', title: 'Listen to a podcast 🎧', doing: false, done: false }
];

export const fetchExampleTasks = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return noLoggedExampleTasks
}

const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL
export const fetchUserTasks = async () => {
    const data = await fetch(BACKEND_URL+"/tasks")
    return data.json()
}
