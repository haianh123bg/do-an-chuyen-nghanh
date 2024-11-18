// Thư mục: /stype/NotificationController.ts
import axios from 'axios';

// URL API backend của bạn
const API_BASE_URL = 'http://localhost:8080/api/notifications';

// Interface cho việc quản lý SSE Emitter
interface SseEmitter {
    close: () => void;
}

// Hàm để đăng ký nhận thông báo qua SSE
export const streamNotifications = (token: string, onMessage: (event: MessageEvent) => void, onError: (error: any) => void): SseEmitter => {
    // Tạo URL endpoint với tham số token
    const url = `${API_BASE_URL}/stream?token=${token}`;

    // Khởi tạo kết nối SSE
    const eventSource = new EventSource(url);

    // Lắng nghe sự kiện message
    eventSource.onmessage = onMessage;

    // Xử lý khi gặp lỗi kết nối
    eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        onError(error);
        eventSource.close();
    };

    // Trả về một đối tượng để quản lý kết nối SSE
    return {
        close: () => {
            eventSource.close();
        }
    };
};

// Hàm gọi API để lấy thông tin người dùng (JWT token)
// Có thể mở rộng hàm này theo nhu cầu của bạn
export const getUserIdFromToken = async (token: string): Promise<string> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user-id`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return (response.data as { userId: string }).userId;
    } catch (error: any) {
        console.error('Lỗi khi lấy User ID từ token:', error.message);
        throw error;
    }
};
