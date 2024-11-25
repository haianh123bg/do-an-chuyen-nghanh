import axios from 'axios';
import ApiService from '../apiService.ts';

const baseUrl = ApiService.BASE_URL + '/carts';

// Định nghĩa service quản lý giỏ hàng
const cartService = {
    /**
     * Lấy thông tin giỏ hàng
     * @returns Promise chứa thông tin giỏ hàng
     */
    getCarts: () => {
        return axios.get(`${baseUrl}`);
    },

    /**
     * Thêm khóa học vào giỏ hàng
     * @param courseId ID của khóa học cần thêm
     * @returns Promise phản hồi việc thêm thành công
     */
    addCourseToCart: (courseId: number) => {
        return axios.post(`${baseUrl}/${courseId}`);
    },

    /**
     * Xóa khóa học khỏi giỏ hàng
     * @param courseId ID của khóa học cần xóa
     * @returns Promise phản hồi việc xóa thành công
     */
    deleteCourseFromCart: (courseId: number) => {
        return axios.delete(`${baseUrl}/${courseId}`);
    }
};

export default cartService;
