import axios from "axios";
import { BACKEND_URL, noLoggedExampleTasks } from "./config";

export const fetchExampleTasks = async () => {
    return noLoggedExampleTasks
}

export const fetchBoardTasks = async (token) => {
    try { 
        const data = await axios.get(BACKEND_URL+"/tasks",{
                headers: {
                    Authorization: `Bearer ${token}`
                }        
            })
        return data.data
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        return [];
    }
}

export const addUserTask = async (token,task) => {
    try {  
        const response = await axios.post(BACKEND_URL + "/tasks", task,{
            headers: {
                Authorization: `Bearer ${token}`
            }        
        });
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

export const deleteUserTask = async (token,taskId) => {
    try {
        const data = await axios.delete(BACKEND_URL+"/tasks/"+taskId,{
            headers: {
                Authorization: `Bearer ${token}`
            }        
        })
        return data.data
    } catch (error) {
        console.error("Error deleting user task:", error);
        return null;
    }
}

export const updateUserTask = async (token,task) => {
    try {
        const data = await axios.put(BACKEND_URL+"/tasks/"+task.id, task,{
            headers: {
                Authorization: `Bearer ${token}`
            }        
        })
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

export const fetchUserBoards = async (token, userId) => {
    try {
        const data = await axios.get(BACKEND_URL+"/boards/user/"+userId, {
            headers: {
                Authorization: `Bearer ${token}`
            }      
        })
        return data.data
    } catch (error) {
        console.error("Error fetching user boards:", error);
        return [];
    }
}

export const fetchCompleteUserBoard = async (token,boardId) => {  
    try {
        const data = await axios.get(BACKEND_URL+"/boards/"+boardId, {
            headers: {
                Authorization: `Bearer ${token}`
            }      
        })
        console.log("Board:", data)
        return data.data
    } catch (error) {
        console.error("Error fetching user board:", error);
        return null;
    }
}

export const createUserBoard = async (token,board) => {
    try {
        const data = await axios.post(BACKEND_URL+"/boards", board, {
            headers: {
                Authorization: `Bearer ${token}`
            }      
        })
        return data.data
    } catch (error) {
        console.error("Error creating user board:", error);
        throw error;
    }
}

export const updateUserBoardData = async (token,data, id) => {
    try {
        const response = await axios.put(BACKEND_URL+"/boards/"+id, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }      
        })
        return response.data
    } catch (error) {
        console.error("Error updating user board:", error);
        throw error;
    }
}

export const deleteUserBoard = async (token,boardId) => {
    try {
        const data = await axios.delete(BACKEND_URL+"/boards/"+boardId, {
            headers: {
                Authorization: `Bearer ${token}`
            }      
        })
        return data.data
    } catch (error) {
        console.error("Error deleting user board:", error);
        return null;
    }
}

