export default class ApiService {
    static BASE_URL = 'http://localhost:8001';

    static getHeader() {
        const token = localStorage.getItem('accessToken');
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    static logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('roles');
        localStorage.removeItem('userId');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('accessToken');
        return !!token;
    }

    static isAdmin() {
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        return roles.includes('ADMIN');
    }

    static isUser() {
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        return roles.includes('USER');
    }

    static isTeacher() {
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        return roles.includes('TEACHER');
    }
}
