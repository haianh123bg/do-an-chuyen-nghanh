// Kiểu dữ liệu phản hồi API chứa danh sách giỏ hàng
export interface CartsResponse {
    cartItems: Array<{
        courseId: number;
        courseName: string;
        price: number;
        quantity: number;
    }>;
}

