export interface PageResponse<T> {
    content: T[];
    pageNo: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}

export interface CourseResponse {
    id: number;
    name: string;
    description: string;
    createdDate: string; 
    updatedDate: string; 
    teacherId: number;
}
export interface CreateCourseRequest {
    name: string;
    description: string;
    teacherId: number;
}
export interface CreateModuleRequest {
    name: string;
    description: string;
    courseId: number;
}
export interface CreateItemRequest {
    name: string;
    content: string;
    moduleId: number;
    type: string; 
}


