
// Định nghĩa các kiểu dữ liệu request
export interface LoginFormRequest {
    email: string;
    password: string;
}

export interface RegisterFormRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface CreateNewPassword {
    password: string;
    confirmPassword: string;
}

// Định nghĩa các kiểu dữ liệu response
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface TokenResponse {
    token: string;
}
