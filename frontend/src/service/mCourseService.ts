import axios from 'axios';
import ApiService from './apiService';

const baseUrl = ApiService.BASE_URL + '/m-course';

const mCourseService = {
    // API lấy tổng quan khóa học
    getOverviewCourse: () => {
        return axios.get(`${baseUrl}/overview`)
    },
};

export default mCourseService;
