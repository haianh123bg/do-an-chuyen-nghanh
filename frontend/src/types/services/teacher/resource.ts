// src/api/teacher/resource/resource.ts

import axios from 'axios';

// Định nghĩa các kiểu dữ liệu cho Request và Response
export interface ApiResponse<T> {
    code: number;
    message?: string;
    result: T;
}

export interface ResourceRequest {
    name: string;
    description: string;
    type: string;
}

export interface ResourceResponse {
    id: number;
    name: string;
    url: string;
}

// API URL cho tài nguyên
const RESOURCE_API_URL = '/teacher/resource';

// Service để xử lý các thao tác với tài nguyên
export class ResourceService {
    // Upload tài nguyên
    static async uploadResource(
        request: ResourceRequest,
        file: File | null
    ): Promise<ApiResponse<ResourceResponse>> {
        const formData = new FormData();
        formData.append('request', JSON.stringify(request)); // Thêm request vào FormData
        if (file) {
            formData.append('file', file); // Nếu có file thì thêm vào FormData
        }

        try {
            const response = await axios.post<ApiResponse<ResourceResponse>>(
                RESOURCE_API_URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data; // Trả về dữ liệu API
        } catch (error) {
            throw new Error('Failed to upload resource');
        }
    }

    // Xóa tài nguyên
    static async deleteResource(resourceId: number): Promise<ApiResponse<void>> {
        try {
            const response = await axios.delete<ApiResponse<void>>(
                `${RESOURCE_API_URL}/${resourceId}`
            );
            return response.data; // Trả về dữ liệu API
        } catch (error) {
            throw new Error('Failed to delete resource');
        }
    }
}

// Controller để thực hiện các thao tác
export class TResourceController {
    // Gọi API để tải lên tài nguyên
    async handleUploadResource(
        request: ResourceRequest,
        file: File | null
    ): Promise<ApiResponse<ResourceResponse>> {
        try {
            const response = await ResourceService.uploadResource(request, file);
            return response; // Trả về kết quả từ API
        } catch (error) {
            throw new Error('Failed to upload resource');
        }
    }

    // Gọi API để xóa tài nguyên
    async handleDeleteResource(resourceId: number): Promise<ApiResponse<void>> {
        try {
            const response = await ResourceService.deleteResource(resourceId);
            return response; // Trả về kết quả từ API
        } catch (error) {
            throw new Error('Failed to delete resource');
        }
    }
}
