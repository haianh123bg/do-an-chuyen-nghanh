import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mCourseService from 'src/service/mCourseService'; // Giả sử bạn đã có service này
import { ApiResponse } from 'src/types/services/response/response'; // Định nghĩa cho ApiResponse
import { MOverviewCourceResponse } from 'src/types/services/admin/mcource'; // Định nghĩa cho MOverviewCourceResponse

// Định nghĩa trạng thái cho slice
interface MCourseState {
    data: ApiResponse<MOverviewCourceResponse> | null;
    loading: boolean;
    error: string | null;
}

const initialState: MCourseState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để lấy tổng quan khóa học
export const fetchCourseOverview = createAsyncThunk(
    'courseOverview/fetchCourseOverview',
    async (_, thunkAPI) => {
        try {
            const response = await mCourseService.getOverviewCourse(); // Gọi service
            return response.data as ApiResponse<MOverviewCourceResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const mCourseSlice = createSlice({
    name: 'courseOverview',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseOverview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseOverview.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Lưu kết quả vào state
            })
            .addCase(fetchCourseOverview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Lưu lỗi vào state
            });
    },
});

export default mCourseSlice.reducer;
