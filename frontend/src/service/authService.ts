import axios from 'axios';
import ApiService from './apiService.ts';
import { RegisterFormRequest } from 'src/types/services/auth/authentication.ts';

const baseUrl = ApiService.BASE_URL + '/auth';

const authService = {
    login: (account: string, password: string) => {
        return axios.post(`${baseUrl}/login`, {
            account,
            password,
        });
    },
    register: (request: RegisterFormRequest) => {
        return axios.post(`${baseUrl}/register`, request);
    },
    // API quên mật khẩu
    forgotPassword: (email: string) => {
        return axios.post(`${baseUrl}/forgot-password`, {
            email,
        });
    },
    // API tạo mật khẩu mới
    createNewPassword: (password: string, confirmPassword: string, token: string) => {
        return axios.post(`${baseUrl}/create-new-password`, {
            password,
            confirmPassword,
            token,
        });
    },
    // API đăng nhập bằng Google
    loginGoogle: (googleCode: string) => {
        return axios.post(`${baseUrl}/login-google`, {
            code: googleCode,
        });
    },
};

export default authService;
