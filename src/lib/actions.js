import axios from "axios";
const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL

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

export const fetchUserTasks = async () => {
    try { 
        const data = await axios.get(BACKEND_URL+"/tasks")
        return data.data
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        return [];
    }
}

export const addUserTask = async (task) => {
    try {  
        const response = await axios.post(BACKEND_URL + "/tasks", task);
        return response.data;
    } catch (error) {
        console.error("Error adding user task:", error);
        if (error.response && error.response.data) {
            throw error.response.data.errors;
        } else {
            throw error;
        }
    }
}

export const deleteUserTask = async (taskId) => {
    try {
        const data = await axios.delete(BACKEND_URL+"/tasks/"+taskId)
        return data.data
    } catch (error) {
        console.error("Error deleting user task:", error);
        return null;
    }
}

export const updateUserTask = async (task) => {
    try {
        const data = await axios.put(BACKEND_URL+"/tasks/"+task.id, task)
        return data.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            throw error.response.data.errors;
        } else {
            throw error;
        }
    }
}

