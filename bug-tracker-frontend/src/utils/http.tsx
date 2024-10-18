import axios from "axios";

const http = axios.create({
    baseURL: process.env.PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default http;