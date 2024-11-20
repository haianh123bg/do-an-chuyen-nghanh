
// Mô hình chi tiết từng item trong giỏ hàng
export interface CartItem {
    courseId: number;
    courseName: string;
    price: number;
    quantity: number;
}

// Mô hình response trả về giỏ hàng
export interface CartsResponse {
    totalItems: number;
    totalPrice: number;
    items: CartItem[];
}

// Yêu cầu thêm khóa học vào giỏ hàng
export interface AddCourseToCartRequest {
    courseId: number;
}

// Yêu cầu xóa khóa học khỏi giỏ hàng
export interface RemoveCourseFromCartRequest {
    courseId: number;
}
