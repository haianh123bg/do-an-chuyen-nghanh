// Các interface tương ứng với request và response của API

// Yêu cầu tạo khóa học
export interface CreateCourseRequest {
    title: string;
    description: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

// Yêu cầu tạo chương (module)
export interface CreateModuleRequest {
    title: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

// Yêu cầu tạo bài học (item)
export interface CreateItemRequest {
    title: string;
    content: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

// Kiểu dữ liệu phản hồi khi lấy thông tin khóa học
export interface CourseResponse {
    id: number;
    title: string;
    description: string;
    // Các trường khác tùy theo yêu cầu của bạn
}

// Kiểu dữ liệu phản hồi phân trang
export interface PageResponse<T> {
    data: T[];
    totalPages: number;
    currentPage: number;
}
