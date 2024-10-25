import axios from 'axios';

export default class ApiService {
    static BASE_URL = 'http://localhost:8080'; // Dựa trên URL API của bạn

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
        const roles = JSON.parse(localStorage.getItem('roles') || '[]'); // Lấy mảng roles từ localStorage
        return roles.includes('ADMIN'); // Kiểm tra nếu mảng chứa 'ADMIN'
    }

    static isUser() {
        const roles = JSON.parse(localStorage.getItem('roles') || '[]'); // Lấy mảng roles từ localStorage
        return roles.includes('USER'); // Kiểm tra nếu mảng chứa 'USER'
    }
}
