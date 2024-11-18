// Interface cho việc quản lý SSE Emitter
export interface SseEmitter {
    close: () => void;
}

// Interface cho phản hồi lấy thông tin người dùng từ token
export interface UserIdResponse {
    userId: string;
}
