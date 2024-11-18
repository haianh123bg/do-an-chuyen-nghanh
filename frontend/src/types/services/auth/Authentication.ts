import axios from 'axios';

const BASE_URL = '/auth'; // URL gốc của API bảo mật

interface LoginFormRequest {
    email: string;
    password: string;
}

interface RegisterFormRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

interface CreateNewPassword {
    password: string;
    confirmPassword: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

interface TokenResponse {
    token: string;
}

// Đăng nhập
export const login = async (request: LoginFormRequest): Promise<LoginResponse> => {
    try {
        // Sử dụng axios với generic để xác định kiểu dữ liệu trả về
        const response = await axios.post<{ result: LoginResponse }>(`${BASE_URL}/login`, request);
        const loginResponse: LoginResponse = response.data.result;

        // Set refresh token cookie
        document.cookie = `refreshToken=${loginResponse.refreshToken}; path=/auth/refresh-token; max-age=${60 * 60 * 24}`;

        // Return login response (no refresh token in response)
        loginResponse.refreshToken = '';
        return loginResponse;
    } catch (error) {
        throw new Error('Login failed');
    }
};

// Đăng ký tài khoản
export const register = async (request: RegisterFormRequest): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, request);
        return response.data;  
    } catch (error) {
        throw new Error('Registration failed');
    }
};

// Lấy refresh token để đổi lấy access token
export const refreshToken = async (): Promise<LoginResponse> => {
    try {
        const cookies = document.cookie.split('; ');
        let refreshToken = '';
        cookies.forEach((cookie) => {
            if (cookie.startsWith('refreshToken=')) {
                refreshToken = cookie.split('=')[1];
            }
        });

        if (!refreshToken) {
            throw new Error('Refresh token is invalid');
        }

        const response = await axios.post<{ result: LoginResponse }>(`${BASE_URL}/refresh-token`, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const loginResponse: LoginResponse = response.data.result;

        // Set new refresh token cookie
        document.cookie = `refreshToken=${loginResponse.refreshToken}; path=/auth/refresh-token; max-age=${60 * 60 * 24}`;

        loginResponse.refreshToken = ''; // Remove refresh token from response
        return loginResponse;
    } catch (error) {
        throw new Error('Token refresh failed');
    }
};

// Gửi yêu cầu quên mật khẩu
export const forgotPassword = async (email: string): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/forgot-password`, { email });
    } catch (error) {
        throw new Error('Failed to send password reset request');
    }
};

// Xác minh mã code xác thực đổi mật khẩu
export const verifyCode = async (email: string, code: string): Promise<TokenResponse> => {
    try {
        const response = await axios.post<{ result: TokenResponse }>(`${BASE_URL}/verify-code`, null, {
            params: { email, code },
        });
        return response.data.result;
    } catch (error) {
        throw new Error('Code verification failed');
    }
};

// Đổi mật khẩu mới
export const createNewPassword = async (request: CreateNewPassword): Promise<LoginResponse> => {
    try {
        if (request.password !== request.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const response = await axios.post<{ result: LoginResponse }>(`${BASE_URL}/create-new-password`, request);
        return response.data.result;
    } catch (error) {
        throw new Error('Password reset failed');
    }
};

// Đăng nhập bằng Google
export const loginWithGoogle = async (code: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<{ result: LoginResponse }>(`${BASE_URL}/login-google`, null, {
            params: { code },
        });
        return response.data.result;
    } catch (error) {
        throw new Error('Google login failed');
    }
};
