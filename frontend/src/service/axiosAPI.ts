import axios from 'axios';

// Tạo axios instance
const axiosAPI = axios.create({
    baseURL: 'https://your-api-url.com', // Đặt base URL cho API
    timeout: 10000, // Thời gian timeout nếu request quá lâu
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
