// import axios from 'axios';
import { dispatch } from 'src/store/Store.tsx';
import ApiService from './apiService.ts';
import axiosAPI from './axiosAPI.ts';

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
                    const data = JSON.parse(event.data);
                    //dispatch(addNotification(data)); 
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
    moreNotifications: (notification_id: number) => {
        return axiosAPI.get(``)
    }
};

export default notificationService;
