

export interface CourseResponse {
    courseId: number;        
    courseName: string;     
    amount: number;
    total: number;            
    star: number;             
    imageUrl: string;         
    totalBuyer: number;       
    totalRevenue: number;     
    active: boolean;         
}

export interface PageResponse<T> {
    pageNo: number;        
    pageSize: number;      
    totalElements: number; 
    totalPages: number;    
    last: boolean;          
    content: T[];          
}

export interface ItemResponse {
    itemId: number;     
    itemName: string;  
    index: number;      
    type: string;       
}
export interface ModuleResponse {
    index: number;             
    moduleId: number;         
    moduleName: string;        
    items: ItemResponse[];     
}
export interface CourseCategoryResponse {
    modules: ModuleResponse[]; 
    courseName: string;       
    courseId: number;         
}

export interface LessionDetailsResponse {
    itemId: number;          
    title: string;            
    description: string;      
    createdAt: string;        
    updatedAt: string;        
    type: string;             
}

export interface PageCourses {
    page_no: number;      
    page_size: number;    
    search_key: string;  
}

export interface CourseSearchParams {
    categoryId: number;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
    searchKey: string;
    beginDate: string;
    endDate: string;
}
export interface CourseOfUser {
    pageNo: number;
    pageSize: number;
    searchKey: string;
}
export interface LessionDetails {
    courseId: number;
    itemId: number;
}
export interface PageCoursesByTeacher {
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
    searchKey: string;
    beginLocalDateTime: string;  
    endLocalDateTime: string;    
}
export interface CreateCourseRequest {
    courseName: string;          
    shortDescription: string;    
    detailDescription: string;   
    categoryId?: number;         
    categoryName?: string;       
}
export interface CreateModuleRequest {
    name: string;        
    description: string;
    order: number;       
}


export enum TypeItemEnum {
    VIDEO_LECTURE = 'VIDEO_LECTURE',
    CODING_EXERCISE = 'CODING_EXERCISE',
    CHOICE_EXERCISES = 'CHOICE_EXERCISES',
    BLOG = 'BLOG',
}
export interface CreateItemRequest {
    type: TypeItemEnum;
    title: string;
    description: string;
    order: number;
    content?: string; 
    url?: string; 
}