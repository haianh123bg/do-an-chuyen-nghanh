


// Interface for PageResponse
export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

// DTO Models for Course
export interface CourseResponse {
    id: number;
    name: string;
    description: string;
    regularPrice: number;
    discount: number;
    category: string;
}

export interface CourseCategoryResponse {
    id: number;
    name: string;
}

export interface LessionDetailsResponse {
    id: number;
    courseId: number;
    itemId: number;
    content: string;
}



