import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import mDashboardService from 'src/service/admin/mDashboardService';
import { MDashboardResponse } from 'src/types/services/admin/mdashboard';
import { ApiResponse } from 'src/types/services/response/response';

interface MOverviewState {
    data: ApiResponse<MDashboardResponse>;
    loading: boolean;
    error: any;
}

const initialState: MOverviewState = {
    data: {
        code: 0,
        message: '',
        result: {
            adsense: 0,
            totalBlog: 0,
            totalCourse: 0,
            totalRevenue: 0,
            totalStudent: 0,
            totalTeacher: 0,
        },
    },
    error: null,
    loading: false,
};

export const fetchMOverview = createAsyncThunk('fetchMOverview', async (_, thunkApi) => {
    try {
        const response = await mDashboardService.overview();
        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data || 'something went wrong');
    }
});

const mOverviewSlice = createSlice({
    name: 'mOverviewSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchMOverview.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchMOverview.fulfilled.type]: (
            state,
            action: PayloadAction<ApiResponse<MDashboardResponse>>,
        ) => {
            state.loading = false;
            state.data = action.payload;
        },
        [fetchMOverview.pending.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default mOverviewSlice.reducer;
