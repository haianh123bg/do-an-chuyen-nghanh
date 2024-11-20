

export interface CourseResponse {
    id: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    imageUrl: string;
    duration: string; 
    createdAt: string;
    updatedAt: string;
}
export interface PageResponse<T> {
    totalItems: number; 
    totalPages: number; 
    currentPage: number; 
    itemsPerPage: number; 
    items: T[]; 
}





