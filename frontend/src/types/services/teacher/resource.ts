export interface ResourceRequest {
    name: string; 
    type: string; 
    tag: string;  
    courseId: number; 
}

export interface ResourceResponse {
    id: number;       
    name: string;     
    url: string;      
    type: string;     
    tag: string;     
}

export interface AppException {
    errorCode: string; 
    message: string;   
}




