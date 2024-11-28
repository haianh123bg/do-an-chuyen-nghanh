export enum TypeResourceEnum {
    PDF = 'PDF',
    EXCEL = 'EXCEL',
    VIDEO = 'VIDEO',
    OTHER = 'OTHER', // Tùy chỉnh thêm các loại khác nếu cần
}
export interface ResourceRequest {
    name: string;          
    url?: string;          
    type: TypeResourceEnum; 
    tag: string;           
}
export interface ResourceResponse {
    id: number;        
    name: string;      
    url: string;       
    type: string;      
    tag?: string;      
}







