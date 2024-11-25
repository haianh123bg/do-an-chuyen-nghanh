import axios from 'axios';
import ApiService from '../apiService.ts';
import { UserInfoRequest } from 'src/types/services/user/account.ts';

const baseUrl = ApiService.BASE_URL + '/user';

const accountService = {
    // API đổi mật khẩu
    changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => {
        return axios.put(`${baseUrl}/change-password`, null, {
            params: {
                oldPassword,
                newPassword,
                confirmPassword,
            },
        });
    },

    // API đổi avatar
    changeAvatar: (avatar: File) => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        return axios.post(`${baseUrl}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // API lấy thông tin user
    getUserInfo: () => {
        return axios.put(`${baseUrl}/info`);
    },

    // API thay đổi thông tin user phần 1
    changeUserInfoP1: (request: UserInfoRequest) => {
        return axios.put(`${baseUrl}/info-p1`, request);
    },

    // API thay đổi thông tin user phần 2 (số điện thoại)
    changeUserInfoP2: (phone: string) => {
        return axios.put(`${baseUrl}/info-p2`, null, {
            params: { phone },
        });
    },
};

export default accountService;
