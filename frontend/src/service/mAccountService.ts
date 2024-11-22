import axios from 'axios';
import ApiService from './apiService.ts';

const baseUrl = ApiService.BASE_URL + '/m-account';

const mAccountService = {
    // API lấy danh sách người dùng theo trang
    getPageUser: (
        pageNo: number = 1,
        pageSize: number = 8,
        sortBy: string = 'userId',
        sortDir: string = 'desc',
        searchKey: string = '',
        begin: string = '',
        end: string = ''
    ) => {
        return axios.get(`${baseUrl}/page-user`, {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                sort_by: sortBy,
                sort_dir: sortDir,
                search_key: searchKey,
                begin,
                end
            }
        });
    },
};

export default mAccountService;
