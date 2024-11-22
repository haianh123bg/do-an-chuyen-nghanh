import axios from 'axios';
import ApiService from '../apiService.ts';

const baseUrl = ApiService.BASE_URL + '/teacher/resource';

const tResourceService = {
    // API upload một tài nguyên
    uploadResource: (request: FormData) => {
        return axios.post(`${baseUrl}`, request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    // API xóa một tài nguyên
    deleteResource: (resourceId: number) => {
        return axios.delete(`${baseUrl}/${resourceId}`);
    },

    // API upload nhiều tài nguyên
    uploadListResource: (request: FormData) => {
        return axios.post(`${baseUrl}/list`, request, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    // API xóa nhiều tài nguyên
    deleteListResource: (resourceIds: number[]) => {
        return axios.delete(`${baseUrl}/list`, {
            data: resourceIds
        });
    },
};

export default tResourceService;
