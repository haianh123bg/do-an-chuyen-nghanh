import axios from 'axios';
import ApiService from './apiService';

// Tạo axios instance
const axiosAPI = axios.create({
    baseURL: ApiService.BASE_URL,
    timeout: 10000,
});

// Thêm interceptor để truyền header Authorization (Bearer Token)
axiosAPI.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage hoặc Redux

        if (token) {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${token}`; // Thêm header Authorization
            } else {
                // Nếu config.headers không tồn tại, tạo mới
                config.headers = {
                    Authorization: `Bearer ${token}`,
                };
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosAPI;
