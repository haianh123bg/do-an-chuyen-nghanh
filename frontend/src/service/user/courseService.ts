import axios from 'axios';
import ApiService from '../apiService';

const baseUrl = ApiService.BASE_URL + '/courses';

const courseService = {
    /**
     * Lấy danh sách khóa học theo trang
     */
    getPageCourses: (
        pageNo: number = 1,
        pageSize: number = 8,
        searchKey: string = ''
    ) => {
        return axios.get(`${baseUrl}/page-courses`, {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                search_key: searchKey
            }
        });
    },

    /**
     * Lấy thông tin danh mục của khóa học
     */
    getCategoryOfCourse: (courseId: number) => {
        return axios.get(`${baseUrl}/${courseId}/category-detail`);
    },

    /**
     * Lấy chi tiết bài học
     */
    getLessionDetails: (courseId: number, itemId: number) => {
        return axios.get(`${baseUrl}/${courseId}/${itemId}`);
    },

    /**
     * Lấy khóa học theo danh mục
     */
    getCourseByCategory: (
        categoryId: number,
        pageNo: number = 1,
        pageSize: number = 8,
        sortBy: string = 'total',
        sortDir: string = 'desc',
        searchKey: string = '',
        beginDate: string = '',
        endDate: string = ''
    ) => {
        return axios.get(`${baseUrl}/categories/${categoryId}`, {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                sort_by: sortBy,
                sort_dir: sortDir,
                search_key: searchKey,
                begin: beginDate,
                end: endDate
            }
        });
    },

    /**
     * Lấy danh sách khóa học của người dùng
     */
    getCourseOfUser: (
        pageNo: number = 1,
        pageSize: number = 8,
        searchKey: string = ''
    ) => {
        return axios.get(`${baseUrl}/page-course/user`, {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                search_key: searchKey
            }
        });
    }
};

export default courseService;
