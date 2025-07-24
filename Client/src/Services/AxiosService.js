import Axios from 'axios';

export const api = Axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 8000
})