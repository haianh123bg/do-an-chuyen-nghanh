import axiosAPI from "../axiosAPI";

const url = "/m-dashboard";

const mDashboardService = {
    overview: () =>{
        return axiosAPI.get(`${url}/overview`)
    }
}

export default mDashboardService;