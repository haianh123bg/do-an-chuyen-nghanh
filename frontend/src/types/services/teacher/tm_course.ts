export interface PageResponse<T> {
    pageNo: number;           
    pageSize: number;         
    totalElements: number;    
    totalPages: number;       
    last: boolean;            
    content: T[];             
}


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
    order?: number;        
}

export enum TypeItemEnum {
    BLOG = 'BLOG',
    CODING_EXERCISE = 'CODING_EXERCISE',
    VIDEO_LECTURE = 'VIDEO_LECTURE',
}

export interface CreateItemRequest {
    type: TypeItemEnum;  
    title: string;       
    description: string; 
    order?: number;      
    content?: string;    
    url?: string;        
}



