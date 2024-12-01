export interface UserInfoResponse {
    userId: number;
    name: string;
    phoneNumber: string;
    gender: GenderEnum;
    avatar: string;
    date: string;
    address: string;
    bankName: string;
    bankBranch: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
    email: string;
}
export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export interface UserInfoRequest {
    name: string;
    gender: GenderEnum;
    date: string;
    address: string;
}

export interface changePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface changeAvatar {
    avatar: File;
}

export interface changeUserInfoP2 {
    phone: string;
}

export interface FormChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
