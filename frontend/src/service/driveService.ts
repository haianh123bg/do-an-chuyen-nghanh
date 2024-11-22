import axios from 'axios';
import ApiService from './apiService.ts';

const baseUrl = ApiService.BASE_URL + '/drive';

const driveService = {
    // API lấy danh sách file với ID
    getIdListFile: () => {
        return axios.get(`${baseUrl}/id/list-file`);
    },

    // API lấy danh sách file được chia sẻ
    listSharedFiles: () => {
        return axios.get(`${baseUrl}/`);
    },
};

export default driveService;
