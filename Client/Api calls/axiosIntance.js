import axios from "axios";

export const axiosUserInstance = axios.create({
    baseURL: 'https://password-generator-85ob.onrender.com',
})