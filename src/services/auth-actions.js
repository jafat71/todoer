import axios from "axios";
import { BACKEND_URL } from "./config";

// Configure axios to include credentials in all requests
axios.defaults.withCredentials = true;

export const loginUser = async (email, password) => {
    const body = {email, password}
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/login", body)
        return data.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

export const registerUser = async (username, email, password) => {
    const body = {username, password, email}
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/register", body)
        return data.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

export const logoutUser = async () => {
    try {
        const data = await axios.post(BACKEND_URL+"/auth/logout")
        return data.data
    } catch (error) {
        console.error("Error during logout:", error);
        // Even if there's an error, we want to clear the client-side state
        return { success: true };
    }
}

export const checkAuthStatus = async () => {
    try {
        const data = await axios.get(BACKEND_URL+"/auth/check")
        return data.data
    } catch (error) {
        console.error("Error checking auth status:", error);
        return { isAuthenticated: false, user: null };
    }
}

export const sendResetEmail = async (email) => {
    const body = {email}
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/forget-password", body)
        return data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

export const resetPasswordWithCode = async (code, password) => {
    const body = {code, password}
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/reset-password", body)
        return data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}
