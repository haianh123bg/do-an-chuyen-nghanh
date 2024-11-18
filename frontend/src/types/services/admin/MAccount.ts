import axios from 'axios';

// Định nghĩa kiểu dữ liệu tương ứng với ApiResponse, PageResponse, và UserResponse
interface UserResponse {
    userId: number;
    username: string;
    email: string;
    // Thêm các thuộc tính khác nếu cần
}

interface PageResponse<T> {
    totalItems: number;
    totalPages: number;
    items: T[];
}

interface ApiResponse<T> {
    code: number;
    result: T;
}

class MAccountService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:8080/m-account'; // URL của API backend
    }

    // Phương thức để lấy danh sách người dùng theo phân trang
    async pageUser(
        pageNo: number = 1,
        pageSize: number = 8,
        sortBy: string = 'userId',
        sortDir: string = 'desc',
        searchKey: string = '',
        begin: string = '',
        end: string = ''
    ): Promise<ApiResponse<PageResponse<UserResponse>>> {
        // Tạo các tham số để gửi trong query string
        const params = {
            page_no: pageNo,
            page_size: pageSize,
            sort_by: sortBy,
            sort_dir: sortDir,
            search_key: searchKey,
            begin: begin,
            end: end,
        };

        try {
            // Gửi yêu cầu GET tới API backend
            const response = await axios.get<ApiResponse<PageResponse<UserResponse>>>(`${this.apiUrl}/page-user`, { params });
            return response.data;
        } catch (error) {
            // Xử lý lỗi khi có sự cố trong quá trình gọi API
            throw new Error('Failed to fetch data: ' + error);
        }
    }
}

export default new MAccountService();
