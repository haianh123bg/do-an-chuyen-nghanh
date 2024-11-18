// src/types/categoryModule.ts

import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho phản hồi API
export type ApiResponse<T> = {
    code: number;
    message?: string;
    result: T;
};

// Định nghĩa kiểu dữ liệu cho CategoryResponse
export type CategoryResponse = {
    id: number;
    name: string;
    description: string;
};

// Dịch vụ để lấy danh sách các danh mục
class CategoryService {
    // Đường dẫn API để lấy danh sách danh mục
    private static readonly API_URL = '/categories';

    // Phương thức gọi API để lấy tất cả các danh mục
    public static async getAllCategories(): Promise<ApiResponse<CategoryResponse[]>> {
        try {
            const response = await axios.get<ApiResponse<CategoryResponse[]>>(this.API_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Giả sử bạn lưu token trong localStorage
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch categories');
        }
    }
}

// Controller để tương tác với giao diện người dùng
class CategoryController {
    // Phương thức để gọi CategoryService và xử lý kết quả
    public static async getCategories(): Promise<CategoryResponse[]> {
        try {
            const apiResponse = await CategoryService.getAllCategories();
            if (apiResponse.code === 200) {
                return apiResponse.result; // Trả về danh sách các CategoryResponse
            } else {
                throw new Error('Failed to fetch categories: Invalid response code');
            }
        } catch (error) {
            console.error('Error in CategoryController:', error);
            throw new Error('Failed to retrieve categories');
        }
    }
}

// Export các lớp và kiểu dữ liệu
export { CategoryController, CategoryService };


