import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import courseService from 'src/service/user/courseService';
import { ApiResponse } from 'src/types/services/response/response';
import { PageResponse } from 'src/types/services/user/course'
import { CourseResponse, CourseOfUser } from 'src/types/services/user/course';

// Định nghĩa kiểu trạng thái
interface CourseOfUserState {
    data: ApiResponse<PageResponse<CourseResponse>> | null;
    loading: boolean;
    error: any | null;
}

// Trạng thái ban đầu
const initialState: CourseOfUserState = {
    data: null,
    loading: false,
    error: null,
};

// Thunk để gọi API getCourseOfUser
export const fetchCourseOfUser = createAsyncThunk(
    'fetchCourseOfUser',
    async (params: CourseOfUser, thunkAPI) => {
        try {
            const response = await courseService.getCourseOfUser(params);
            return response.data as ApiResponse<PageResponse<CourseResponse>>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

// Slice quản lý trạng thái getCourseOfUser
const getCourseOfUserSlice = createSlice({
    name: 'getCourseOfUserSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseOfUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCourseOfUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default getCourseOfUserSlice.reducer;
