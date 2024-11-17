import axios from 'axios';
import ApiService from './apiService.ts';

const baseUrl = ApiService.BASE_URL + '/auth';

const authService = {
    login: (account: string, password: string) => {
        return axios.post(`${baseUrl}/login`, {
            account,
            password,
        });
    },
    register: (email: string, password: string) => {
        return axios.post(`${baseUrl}/register`, {
            email,
            password,
        });
    },
};

export default authService;
