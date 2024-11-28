
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userId: number;
    expires: string; 
    roles: string[];
}

export interface RegisterFormRequest {
    name: string;
    email: string;
    password: string;
    captchaToken: string;
}

export interface refreshToken {
    refreshToken: string;
}

export interface forgotPassword {
    email: string;
}

export interface verifyCode {
    email: string;
    code: string;
}

export interface CreateNewPassword {
    password: string;
    confirmPassword: string;
    token: string;
}

export interface loginWithGoogle{
    code: string;
}






