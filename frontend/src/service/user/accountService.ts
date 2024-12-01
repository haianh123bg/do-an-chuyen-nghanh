import ApiService from '../apiService.ts';
import { FormChangePassword, UserInfoRequest } from 'src/types/services/user/account.ts';
import axiosAPI from '../axiosAPI.ts';

const baseUrl = ApiService.BASE_URL + '/user';

const accountService = {
    // API đổi mật khẩu
    changePassword: (request: FormChangePassword) => {
        return axiosAPI.put(`${baseUrl}/change-password`, request);
    },

    // API đổi avatar
    changeAvatar: (avatar: File) => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        return axiosAPI.post(`${baseUrl}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // API lấy thông tin user
    getUserInfo: () => {
        return axiosAPI.get(`${baseUrl}/info`);
    },

    // API thay đổi thông tin user phần 1
    changeUserInfoP1: (request: UserInfoRequest) => {
        return axiosAPI.put(`${baseUrl}/info-p1`, request);
    },

    // API thay đổi thông tin user phần 2 (số điện thoại)
    changeUserInfoP2: (phone: string) => {
        return axiosAPI.put(`${baseUrl}/info-p2`, null, {
            params: { phone },
        });
    },
};

export default accountService;
