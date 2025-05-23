import axios from "axios";
import { BACKEND_URL, noLoggedExampleTasks } from "./config";

// Configure axios to include credentials in all requests
axios.defaults.withCredentials = true;

export const fetchExampleTasks = async () => {
    return noLoggedExampleTasks
}

export const fetchBoardTasks = async () => {
    try { 
        const data = await axios.get(BACKEND_URL+"/tasks")
        return data.data
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        return [];
    }
}

export const addUserTask = async (task) => {
    console.log("task", task)
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
        console.error("Error updating user task:", error);
        if (error.response && error.response.data) {
            throw error.response.data.errors;
        } else {
            throw error;
        }
    }
}

export const fetchUserBoards = async (userId) => {
    try {
        const data = await axios.get(BACKEND_URL+"/boards/user/"+userId)
        return data.data
    } catch (error) {
        console.error("Error fetching user boards:", error);
        return [];
    }
}

export const fetchCompleteUserBoard = async (boardId) => {  
    try {
        const data = await axios.get(BACKEND_URL+"/boards/"+boardId)
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

export const updateUserBoardData = async (data, id) => {
    try {
        const response = await axios.put(BACKEND_URL+"/boards/"+id, data)
        return response.data
    } catch (error) {
        console.error("Error updating user board:", error);
        throw error;
    }
}

export const updateUserBoardStatus = async (boardId) => {
    try {
        const data = await axios.put(BACKEND_URL+"/boards/"+boardId+"/status")
        return data.data
    } catch (error) {
        console.error("Error changing board status:", error);
        throw error;
    }
}

export const deleteUserBoard = async (boardId) => {
    try {
        const data = await axios.delete(BACKEND_URL+"/boards/"+boardId)
        return data.data
    } catch (error) {
        console.error("Error deleting user board:", error);
        return null;
    }
}


export const updateUserInfo = async (userId, username) => {
    const body = {username}
    try {
        const data = await axios.put(BACKEND_URL+"/users/"+userId, body)
        return data.status
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

