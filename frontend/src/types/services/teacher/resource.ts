// Định nghĩa các kiểu dữ liệu cho Request và Response


// Kiểu dữ liệu cho yêu cầu tải lên tài nguyên
export interface ResourceRequest {
    name: string;
    description: string;
    type: string;
}

// Kiểu dữ liệu cho phản hồi sau khi tải lên tài nguyên
export interface ResourceResponse {
    id: number;
    name: string;
    url: string;
}
