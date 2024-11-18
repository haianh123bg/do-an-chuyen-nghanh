// src/types/account.ts

import axios from 'axios';

// Định nghĩa các kiểu dữ liệu cho Response và Request
export interface ApiResponse<T> {
    code: number;
    message: string;
    result: T;
}

export interface UserInfoRequest {
    fullName: string;
    email: string;
    gender: string;
}

export interface UserInfoResponse {
    id: number;
    fullName: string;
    email: string;
    gender: string;
    avatarUrl: string;
}

// API URL cho tài khoản
const ACCOUNT_API_URL = '/user';

// Service để xử lý các thao tác với tài khoản
export class AccountService {

    // Thay đổi mật khẩu người dùng
    static async changePassword(
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ): Promise<ApiResponse<void>> {
        try {
            const response = await axios.put<ApiResponse<void>>(`${ACCOUNT_API_URL}/change-password`, null, {
                params: { oldPassword, newPassword, confirmPassword },
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to change password');
        }
    }

    // Thay đổi ảnh đại diện
    static async changeAvatar(avatar: File): Promise<ApiResponse<string>> {
        const formData = new FormData();
        formData.append('avatar', avatar);

        try {
            const response = await axios.post<ApiResponse<string>>(`${ACCOUNT_API_URL}/avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to change avatar');
        }
    }

    // Lấy thông tin người dùng
    static async getUserInfo(): Promise<ApiResponse<UserInfoResponse>> {
        try {
            const response = await axios.put<ApiResponse<UserInfoResponse>>(`${ACCOUNT_API_URL}/info`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user info');
        }
    }

    // Thay đổi thông tin người dùng P1
    static async changeUserInfoP1(request: UserInfoRequest): Promise<ApiResponse<UserInfoResponse>> {
        try {
            const response = await axios.put<ApiResponse<UserInfoResponse>>(`${ACCOUNT_API_URL}/info-p1`, request);
            return response.data;
        } catch (error) {
            throw new Error('Failed to change user info P1');
        }
    }

    // Thay đổi thông tin người dùng P2 (số điện thoại)
    static async changeUserInfoP2(phone: string): Promise<ApiResponse<string>> {
        try {
            const response = await axios.put<ApiResponse<string>>(`${ACCOUNT_API_URL}/info-p2`, null, {
                params: { phone },
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to change user info P2');
        }
    }
}

// Controller để thực hiện các thao tác
export class AccountController {

    // Gọi API để thay đổi mật khẩu người dùng
    async handleChangePassword(
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ): Promise<ApiResponse<void>> {
        try {
            const response = await AccountService.changePassword(oldPassword, newPassword, confirmPassword);
            return response;
        } catch (error) {
            throw new Error('Failed to change password');
        }
    }

    // Gọi API để thay đổi ảnh đại diện
    async handleChangeAvatar(avatar: File): Promise<ApiResponse<string>> {
        try {
            const response = await AccountService.changeAvatar(avatar);
            return response;
        } catch (error) {
            throw new Error('Failed to change avatar');
        }
    }

    // Gọi API để lấy thông tin người dùng
    async handleGetUserInfo(): Promise<ApiResponse<UserInfoResponse>> {
        try {
            const response = await AccountService.getUserInfo();
            return response;
        } catch (error) {
            throw new Error('Failed to fetch user info');
        }
    }

    // Gọi API để thay đổi thông tin người dùng P1
    async handleChangeUserInfoP1(request: UserInfoRequest): Promise<ApiResponse<UserInfoResponse>> {
        try {
            const response = await AccountService.changeUserInfoP1(request);
            return response;
        } catch (error) {
            throw new Error('Failed to change user info P1');
        }
    }

    // Gọi API để thay đổi thông tin người dùng P2 (số điện thoại)
    async handleChangeUserInfoP2(phone: string): Promise<ApiResponse<string>> {
        try {
            const response = await AccountService.changeUserInfoP2(phone);
            return response;
        } catch (error) {
            throw new Error('Failed to change user info P2');
        }
    }
}
