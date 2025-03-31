import axios from "axios";
import { BACKEND_URL } from "./config";

export const loginUser = async (email, password) => {
    const body = {email,password}
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/login",body)
        return data.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.errors;
        } else {
            throw error;
        }
    }
}

export const registerUser  = async (username, email, password) => {
    const body = {username,password,email}
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/register",body)
        return data.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

export const sendResetEmail = async (email) => {
    const body = {email}
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/forget-password",body)
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
    console.log(body)
    try { 
        const data = await axios.post(BACKEND_URL+"/auth/reset-password",body)
        return data
    } catch (error) {
        console.log(error)
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}