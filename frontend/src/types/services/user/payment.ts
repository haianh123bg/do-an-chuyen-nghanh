// paymentModule.ts
import axios from 'axios';

// Các kiểu dữ liệu mô phỏng cho PaymentRequest và PaymentResponse
interface PaymentRequest {
    amount: number;
    paymentMethod: string;
    userId: string;
    // Thêm các trường cần thiết khác
}

interface PaymentResponse {
    transactionId: string;
    status: string;
    message: string;
}

interface ApiResponse<T> {
    code: number;
    result: T;
}

interface SepayIpnRequest {
    transactionId: string;
    status: string;
    amount: number;
    // Thêm các trường cần thiết từ webhook
}

// Payment Service: xử lý thanh toán
class PaymentService {
    async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
        try {
            // Gọi API thanh toán từ backend, đảm bảo có kiểu trả về đúng
            const response = await axios.post<PaymentResponse>('https://example.com/api/payment', request);

            // Trả về dữ liệu của API dưới dạng PaymentResponse
            return response.data;
        } catch (error) {
            // Xử lý lỗi, trả về thông điệp lỗi nếu có
            throw new Error('Thanh toán thất bại');
        }
    }

    async handleSepayIpn(requestBody: SepayIpnRequest): Promise<ApiResponse<string>> {
        try {
            // Xử lý webhook từ Sepay, có thể xác thực dữ liệu hoặc gọi API backend
            const response = await axios.post('https://example.com/api/payment/ipn', requestBody);
            return { code: 200, result: 'Webhook processed successfully' };
        } catch (error) {
            return { code: 500, result: 'Error processing webhook' };
        }
    }
}

// Payment Controller: xử lý các route
class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    // Thanh toán đơn hàng
    async createPayment(request: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
        try {
            const paymentResponse = await this.paymentService.createPayment(request);
            return { code: 200, result: paymentResponse };
        } catch (error) {
            return { code: 500, result: { transactionId: '', status: 'failed', message: 'Thanh toán thất bại' } };
        }
    }

    // Webhook từ Sepay
    async sepayIpn(requestBody: SepayIpnRequest): Promise<ApiResponse<string>> {
        try {
            const ipnResponse = await this.paymentService.handleSepayIpn(requestBody);
            return ipnResponse;
        } catch (error) {
            return { code: 500, result: 'Error processing Sepay IPN' };
        }
    }
}

// Đoạn mã thử nghiệm để gọi PaymentController
const paymentController = new PaymentController();

// Mô phỏng yêu cầu thanh toán
const paymentRequest: PaymentRequest = {
    amount: 100,
    paymentMethod: 'credit_card',
    userId: 'user123'
};

paymentController.createPayment(paymentRequest).then(response => {
    console.log(response);
});

// Mô phỏng yêu cầu webhook Sepay
const sepayRequest: SepayIpnRequest = {
    transactionId: 'txn123',
    status: 'success',
    amount: 100
};

paymentController.sepayIpn(sepayRequest).then(response => {
    console.log(response);
});
