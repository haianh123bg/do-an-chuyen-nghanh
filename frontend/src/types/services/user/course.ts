

// Import axios
import axios from 'axios';

// Interface for PageResponse
interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

// DTO Models for Course
interface CourseResponse {
    id: number;
    name: string;
    description: string;
    regularPrice: number;
    discount: number;
    category: string;
}

interface CourseCategoryResponse {
    id: number;
    name: string;
}

interface LessionDetailsResponse {
    id: number;
    courseId: number;
    itemId: number;
    content: string;
}

// API Response DTO
interface ApiResponseDto<T> {
    code: number;
    result: T;
}

// Date Utility for Formatting Date Strings
class DateUtils {
    static formatLocalDateTime(dateStr: string): string {
        if (!dateStr) return '';
        // Logic to format the date string (for now just return as is)
        return dateStr;
    }
}

// CourseService class to interact with backend API
class CourseService {
    private baseUrl = 'http://your-api-url.com';  // Địa chỉ API backend của bạn

    // Phân trang danh sách khóa học
    async getPageCourses(pageNo: number, pageSize: number, searchKey: string): Promise<PageResponse<CourseResponse>> {
        try {
            const response = await axios.get<{ result: PageResponse<CourseResponse> }>(`${this.baseUrl}/courses/page-courses`, {
                params: {
                    page_no: pageNo,
                    page_size: pageSize,
                    search_key: searchKey,
                },
            });

            if (response.data && response.data.result) {
                return response.data.result;
            }

            throw new Error('Response data is invalid');
        } catch (error) {
            console.error('Error fetching courses', error);
            throw new Error('Could not fetch courses');
        }
    }

    // Lấy ra chi tiết danh mục của một khóa học
    async getCategoryOfCourse(courseId: number): Promise<CourseCategoryResponse> {
        try {
            const response = await axios.get<{ result: CourseCategoryResponse }>(`${this.baseUrl}/courses/${courseId}/category-detail`);

            if (response.data && response.data.result) {
                return response.data.result;
            }

            throw new Error('Response data is invalid');
        } catch (error) {
            console.error('Error fetching course category', error);
            throw new Error('Could not fetch course category');
        }
    }

    // Lấy ra chi tiết bài học
    async getLessionDetails(courseId: number, itemId: number): Promise<LessionDetailsResponse> {
        try {
            const response = await axios.get<{ result: LessionDetailsResponse }>(`${this.baseUrl}/courses/${courseId}/${itemId}`);

            if (response.data && response.data.result) {
                return response.data.result;
            }

            throw new Error('Response data is invalid');
        } catch (error) {
            console.error('Error fetching lesson details', error);
            throw new Error('Could not fetch lesson details');
        }
    }

    // Lấy danh sách khóa học theo danh mục
    async findCoursesByCategoryId(
        categoryId: number,
        pageNo: number,
        pageSize: number,
        sortBy: string,
        sortDir: string,
        searchKey: string,
        begin: string,
        end: string
    ): Promise<PageResponse<CourseResponse>> {
        try {
            const response = await axios.get<{ result: PageResponse<CourseResponse> }>(`${this.baseUrl}/courses/categories/${categoryId}`, {
                params: {
                    page_no: pageNo,
                    page_size: pageSize,
                    sort_by: sortBy,
                    sort_dir: sortDir,
                    search_key: searchKey,
                    begin: begin,
                    end: end,
                },
            });

            if (response.data && response.data.result) {
                return response.data.result;
            }

            throw new Error('Response data is invalid');
        } catch (error) {
            console.error('Error fetching courses by category', error);
            throw new Error('Could not fetch courses by category');
        }
    }
}

// Course Controller with methods for handling course-related requests
class CourseController {
    private courseService: CourseService;

    constructor(courseService: CourseService) {
        this.courseService = courseService;
    }

    // Phân trang danh sách khóa học
    async getPageCourses(
        pageNo: number = 1,
        pageSize: number = 8,
        searchKey: string = ''
    ): Promise<ApiResponseDto<PageResponse<CourseResponse>>> {
        try {
            const result = await this.courseService.getPageCourses(pageNo, pageSize, searchKey);
            return { code: 200, result };
        } catch (error) {
            return { code: 500, result: { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 } }; // Return empty response on error
        }
    }

    // Lấy ra chi tiết danh mục của một khóa học
    async getCategoryOfCourse(courseId: number): Promise<ApiResponseDto<CourseCategoryResponse>> {
        try {
            const result = await this.courseService.getCategoryOfCourse(courseId);
            return { code: 200, result };
        } catch (error) {
            return { code: 500, result: { id: 0, name: '' } }; // Return default on error
        }
    }

    // Lấy ra chi tiết bài học
    async getLessionDetails(
        courseId: number,
        itemId: number
    ): Promise<ApiResponseDto<LessionDetailsResponse>> {
        try {
            const result = await this.courseService.getLessionDetails(courseId, itemId);
            return { code: 200, result };
        } catch (error) {
            return { code: 500, result: { id: 0, courseId: 0, itemId: 0, content: '' } }; // Return default on error
        }
    }

    // Lấy danh sách khóa học theo danh mục
    async getCourseByCategory(
        categoryId: number,
        pageNo: number = 1,
        pageSize: number = 8,
        sortBy: string = 'total',
        sortDir: string = 'desc',
        searchKey: string = '',
        beginDate: string = '',
        endDate: string = ''
    ): Promise<ApiResponseDto<PageResponse<CourseResponse>>> {
        try {
            const begin = DateUtils.formatLocalDateTime(beginDate);
            const end = DateUtils.formatLocalDateTime(endDate);
            const result = await this.courseService.findCoursesByCategoryId(
                categoryId,
                pageNo,
                pageSize,
                sortBy,
                sortDir,
                searchKey,
                begin,
                end
            );
            return { code: 200, result };
        } catch (error) {
            return { code: 500, result: { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 } }; // Return empty response on error
        }
    }
}

// Sample usage
const courseService = new CourseService();
const courseController = new CourseController(courseService);

// Example: Call the method to get paginated courses
courseController.getPageCourses(1, 8, '').then(response => {
    console.log(response);
});
