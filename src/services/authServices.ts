import axios from "node_modules/axios/index.cjs";

const BASE_URL = "";

export const login = async (email: string, password: string) => {
    const res = await axios.post (`${BASE_URL}/login`,{email, password});
    return res.data.token; // Assume backend returns token
}

export const signup = async (email: string, password: string) => {
    const res = await axios.post (`${BASE_URL}/signup`, {email, password});
    return res.data.token; // Assume backend returns token
}