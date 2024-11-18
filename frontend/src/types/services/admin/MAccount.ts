
export interface UserResponse {
    userId: number;
    username: string;
    email: string;
    // Thêm các thuộc tính khác nếu cần
}

// Model của PageResponse
export interface PageResponse<T> {
    totalItems: number;
    totalPages: number;
    items: T[];
}


