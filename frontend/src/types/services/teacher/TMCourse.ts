import axios from 'axios';

// Các interface tương ứng với request và response của API
interface CreateCourseRequest {
    title: string;
    description: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

interface CreateModuleRequest {
    title: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

interface CreateItemRequest {
    title: string;
    content: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

interface ApiResponse<T> {
    code: number;
    message: string;
    result: T;
}

interface CourseResponse {
    id: number;
    title: string;
    description: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

interface PageResponse<T> {
    data: T[];
    totalPages: number;
    currentPage: number;
}

// Địa chỉ API Backend
const BASE_URL = 'http://localhost:8080/api'; // Cập nhật URL cho đúng với backend

export class TMCourseController {

    // Lấy danh sách khóa học của giáo viên
    static async getPageCoursesByTeacher(
        pageNo: number = 1,
        pageSize: number = 8,
        sortBy: string = 'userId',
        sortDir: string = 'desc',
        searchKey: string = '',
        beginDate: string = '',
        endDate: string = ''
    ): Promise<ApiResponse<PageResponse<CourseResponse>>> {
        try {
            const response = await axios.get<ApiResponse<PageResponse<CourseResponse>>>(`${BASE_URL}/teacher/courses`, {
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
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch courses');
        }
    }

    // Tạo khóa học
    static async createCourse(request: CreateCourseRequest): Promise<ApiResponse<number>> {
        try {
            const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/teacher/courses`, request);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create course');
        }
    }

    // Tạo chương
    static async createModule(courseId: number, request: CreateModuleRequest): Promise<ApiResponse<number>> {
        try {
            const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/teacher/courses/modules`, request, {
                params: { courseId }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create module');
        }
    }

    // Tạo bài học
    static async createItem(moduleId: number, request: CreateItemRequest): Promise<ApiResponse<number>> {
        try {
            const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/teacher/courses/items`, request, {
                params: { moduleId }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create item');
        }
    }
}
