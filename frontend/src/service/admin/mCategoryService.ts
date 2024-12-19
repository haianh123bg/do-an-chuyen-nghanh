import axiosAPI from '../axiosAPI';

const url = '/m-category';

const mCategoryService = {
    overviewCategory: () => {
        return axiosAPI.get(`${url}/overview`);
    },
};

export default mCategoryService;
