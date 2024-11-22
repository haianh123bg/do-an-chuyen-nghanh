// import axios from 'axios';
import ApiService from './apiService.ts';

const baseUrl = ApiService.BASE_URL + '/api/notifications';

const notificationService = {
    // API đăng ký kết nối SSE
    streamNotifications: (token: string) => {
        // Tạo một EventSource để lắng nghe Server-Sent Events
        const eventSource = new EventSource(`${baseUrl}/stream?token=${token}`);
        return {
            // Hàm lắng nghe các sự kiện từ server
            subscribe: (callback: (data: any) => void) => {
                eventSource.onmessage = (event) => {
                    callback(JSON.parse(event.data));
                };
            },
            // Hàm xử lý khi có lỗi
            onError: (errorCallback: (error: Event) => void) => {
                eventSource.onerror = errorCallback;
            },
            // Hàm đóng kết nối
            close: () => {
                eventSource.close();
            }
        };
    },
};

export default notificationService;
