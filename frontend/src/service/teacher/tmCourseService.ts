import axios from 'axios';
import ApiService from '../apiService.ts';

const baseUrl = ApiService.BASE_URL + '/teacher/courses';

const tmCourseService = {
    // API lấy danh sách khóa học của giáo viên
    getPageCoursesByTeacher: (
        pageNo: number = 1,
        pageSize: number = 8,
        sortBy: string = 'userId',
        sortDir: string = 'desc',
        searchKey: string = '',
        begin: string = '',
        end: string = ''
    ) => {
        return axios.get(`${baseUrl}`, {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                sort_by: sortBy,
                sort_dir: sortDir,
                search_key: searchKey,
                begin,
                end
            }
        });
    },

    // API tạo khóa học mới
    createCourse: (request: {
        name: string;
        description: string;
        // thêm các field khác theo CreateCourseRequest
    }) => {
        return axios.post(`${baseUrl}`, request);
    },

    // API tạo chương mới
    createModule: (
        courseId: number,
        request: {
            name: string;
            description: string;
            // thêm các field khác theo CreateModuleRequest
        }
    ) => {
        return axios.post(`${baseUrl}/modules`, request, {
            params: { courseId }
        });
    },

    // API tạo bài học mới
    createItem: (
        moduleId: number,
        request: {
            name: string;
            description: string;
            type: string;
            // thêm các field khác theo CreateItemRequest
        }
    ) => {
        return axios.post(`${baseUrl}/items`, request, {
            params: { moduleId }
        });
    },
};

export default tmCourseService;
