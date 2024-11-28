
export interface UserResponse {
    id: number;
    name: string;
    email: string;
    totalBuyer: number;
    isEnable: boolean;
    totalSpending: number;
}

export interface PageResponse<T> {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    content: T[];
}






