import axios from "axios";
const BACKEND_URL =  import.meta.env.VITE_BACKEND_URL

const noLoggedExampleTasks = [
    { id: 'task-1', title: 'Water the plants 🌱', status: "DOING" },
    { id: 'task-2', title: 'Go for a run 🏃‍♂️', status: "DOING" },
    { id: 'task-3', title: 'Read a book 📚', status: "DONE" },
    { id: 'task-4', title: 'Write in the journal ✍️', status: "DOING" },
    { id: 'task-5', title: 'Cook dinner 🍳', status: "DONE" },
    { id: 'task-6', title: 'Walk the dog 🐕', status: "TODO" },
    { id: 'task-7', title: 'Listen to a podcast 🎧', status: "TODO" }
];

export const fetchExampleTasks = async () => {
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
        console.log("Task:", task)
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

export const fetchUserBoards = async () => {
    try {
        const data = await axios.get(BACKEND_URL+"/boards")
        return data.data
    } catch (error) {
        console.error("Error fetching user boards:", error);
        return [];
    }
}

export const fetchUserBoard = async (boardId) => {  
    try {
        const data = await axios.get(BACKEND_URL+"/boards/"+boardId)
        console.log("Board:", data)
        return data.data
    } catch (error) {
        console.error("Error fetching user board:", error);
        return null;
    }
}

export const createUserBoard = async (board) => {
    try {
        const data = await axios.post(BACKEND_URL+"/boards", board)
        return data.data
    } catch (error) {
        console.error("Error creating user board:", error);
        throw error;
    }
}

export const updateUserBoard = async (data, id) => {
    try {
        console.log("Data:", data)
        const response = await axios.put(BACKEND_URL+"/boards/"+id, data)
        return response.data
    } catch (error) {
        console.error("Error updating user board:", error);
        throw error;
    }
}
