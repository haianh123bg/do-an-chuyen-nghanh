

export interface UserInfoResponse {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserInfoRequest {
    username?: string;
    email?: string;
    fullName?: string;
}

export interface PasswordChangeRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AvatarUploadRequest {
    avatar: File;
}

export interface PhoneChangeRequest {
    phone: string;
}
