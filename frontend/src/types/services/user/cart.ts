import axios from 'axios';

// Định nghĩa các kiểu dữ liệu cho phản hồi API
interface CartsResponse {
    cartItems: Array<{
        courseId: number;
        courseName: string;
        price: number;
        quantity: number;
    }>;
}

interface ApiResponse<T> {
    code: number;
    message?: string;
    result: T;
}

// Lấy giỏ hàng của người dùng
export const getCarts = async (): Promise<ApiResponse<CartsResponse>> => {
    try {
        const response = await axios.get<ApiResponse<CartsResponse>>('/api/carts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Giả sử bạn lưu token trong localStorage
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch cart data');
    }
};

// Thêm khóa học vào giỏ hàng
export const addCourseToCart = async (courseId: number): Promise<ApiResponse<string>> => {
    try {
        const response = await axios.post<ApiResponse<string>>(`/api/carts/${courseId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Giả sử bạn lưu token trong localStorage
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add course to cart');
    }
};

// Xóa khóa học khỏi giỏ hàng
export const deleteCourseFromCart = async (courseId: number): Promise<ApiResponse<string>> => {
    try {
        const response = await axios.delete<ApiResponse<string>>(`/api/carts/${courseId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Giả sử bạn lưu token trong localStorage
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete course from cart');
    }
};
