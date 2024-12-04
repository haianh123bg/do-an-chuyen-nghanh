import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import courseService from 'src/service/user/courseService';
import { ApiResponse } from 'src/types/services/response/response';
import { LessionDetailsResponse } from 'src/types/services/user/course';

// Định nghĩa kiểu trạng thái
interface LessionDetailsState {
    data: ApiResponse<LessionDetailsResponse> | null;
    loading: boolean;
    error: any | null;
}

// Trạng thái ban đầu
const initialState: LessionDetailsState = {
    data: null,
    loading: false,
    error: null,
};

// Thunk để gọi API lấy chi tiết bài học
export const fetchLessionDetails = createAsyncThunk(
    'fetchLessionDetails',
    async (
        { courseId, itemId }: { courseId: number; itemId: number },
        thunkAPI
    ) => {
        try {
            const response = await courseService.getLessionDetails(courseId, itemId);
            return response.data as ApiResponse<LessionDetailsResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

// Slice quản lý trạng thái của getLessionDetails
const getLessionDetailsSlice = createSlice({
    name: 'getLessionDetailsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessionDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLessionDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLessionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default getLessionDetailsSlice.reducer;
