

// Các kiểu dữ liệu cho PaymentRequest
export interface PaymentRequest {
    amount: number;
    paymentMethod: string;
    userId: string;
    // Thêm các trường cần thiết khác
}

// Kiểu dữ liệu trả về cho PaymentResponse
export interface PaymentResponse {
    transactionId: string;
    status: string;
    message: string;
}

// Kiểu dữ liệu chung cho ApiResponse
export interface ApiResponse<T> {
    code: number;
    result: T;
}

// Kiểu dữ liệu cho Sepay IPN Request
export interface SepayIpnRequest {
    transactionId: string;
    status: string;
    amount: number;
    // Thêm các trường cần thiết từ webhook
}
