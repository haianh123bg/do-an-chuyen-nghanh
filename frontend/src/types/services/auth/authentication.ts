
// Định nghĩa các kiểu dữ liệu request
export interface LoginFormRequest {
    username: string; 
    password: string; 
}


export interface RegisterFormRequest {
    username: string; 
    password: string; 
    email: string;    
}


export interface CreateNewPassword {
    password: string;         
    confirmPassword: string;  
}


// Định nghĩa các kiểu dữ liệu response
export interface LoginResponse {
    accessToken: string;  
    refreshToken: string; 
    username: string;     
    roles: string[];      
}

export interface TokenResponse {
    accessToken: string; 
}

