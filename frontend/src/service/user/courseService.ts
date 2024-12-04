import axios from 'axios';
import ApiService from '../apiService';
import {CourseSearchParams} from 'src/types/services/user/course.ts';
import {CourseOfUser} from 'src/types/services/user/course.ts';

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
    getCourseByCategory: (params: CourseSearchParams) => {
        return axios.get(`${baseUrl}/categories/${params.categoryId}`, {
            params: {
                page_no: params.pageNo,
                page_size: params.pageSize,
                sort_by: params.sortBy,
                sort_dir: params.sortDir,
                search_key: params.searchKey,
                begin: params.beginDate,
                end: params.endDate,
            },
        });
    },

    /**
     * Lấy danh sách khóa học của người dùng
     */
    getCourseOfUser: (params: CourseOfUser) => {
        return axios.get(`${baseUrl}/page-course/user`, {
            params: {
                page_no: params.pageNo,
                page_size: params.pageSize,
                search_key: params.searchKey,
            },
        });
    },
};

export default courseService;
