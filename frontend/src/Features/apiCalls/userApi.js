import axios from "axios";
import {openLoginForm} from "../Slices/Ui/uiSlice"

const BASE_URL = "http://localhost:8000/api/v1/users" 

export const Register = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/register`, credentials)
    return response.data.data
}

export const Login = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials)
    console.log(response.data)
    return response.data.data
}

export const Logout = async () => {
    const response = await axios.post(`${BASE_URL}/logout`, credentials)
    return response.data.data
}