

export interface CartResponse {
    courseImageUrl: string; 
    courseId: number;      
    courseName: string;     
    retailPrice: number;    
    discountedPrice: number; 
}
export interface CartsResponse {
    courses: CartResponse[]; 
    totalRetailPrice: number; 
    totalDiscountedPrice: number; 
}

// Yêu cầu thêm khóa học vào giỏ hàng
export interface addCourseToCart {
    courseId: number;
}

// Yêu cầu xóa khóa học khỏi giỏ hàng
export interface deleteCourseToCart {
    courseId: number;
}
