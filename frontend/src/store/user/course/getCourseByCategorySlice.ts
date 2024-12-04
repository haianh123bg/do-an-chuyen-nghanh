import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import courseService from 'src/service/user/courseService';
import { ApiResponse } from 'src/types/services/response/response';
import { PageResponse } from 'src/types/services/user/course'
import { CourseResponse, CourseSearchParams } from 'src/types/services/user/course';

// Định nghĩa kiểu trạng thái
interface CourseByCategoryState {
    data: ApiResponse<PageResponse<CourseResponse>> | null;
    loading: boolean;
    error: any | null;
}

// Trạng thái ban đầu
const initialState: CourseByCategoryState = {
    data: null,
    loading: false,
    error: null,
};

// Thunk để gọi API getCourseByCategory
export const fetchCourseByCategory = createAsyncThunk(
    'fetchCourseByCategory',
    async (params: CourseSearchParams, thunkAPI) => {
        try {
            const response = await courseService.getCourseByCategory(params);
            return response.data as ApiResponse<PageResponse<CourseResponse>>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

// Slice quản lý trạng thái getCourseByCategory
const getCourseByCategorySlice = createSlice({
    name: 'getCourseByCategorySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCourseByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default getCourseByCategorySlice.reducer;
