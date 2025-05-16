import axios from 'axios';

const BASE_URL = "";

export const loginApi = async (email: string, password: string) => {
    const res = await axios.post (`${BASE_URL}/login`,{email, password});
    return res.data.token; // Assume backend returns token
}

export const signupApi = async (email: string, password: string) => {
    const res = await axios.post (`${BASE_URL}/signup`, {email, password});
    return res.data.token; // Assume backend returns token
}