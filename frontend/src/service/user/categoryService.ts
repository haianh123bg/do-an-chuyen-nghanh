import axios from 'axios';
import ApiService from '../apiService';

// Định nghĩa service quản lý danh mục
const categoryService = {
    /**
     * Lấy danh sách danh mục
     * @returns Promise chứa danh sách danh mục
     */
    getCategories: function() {
        return axios.get(`${ApiService.BASE_URL}/categories`);
    }
};

export default categoryService;
