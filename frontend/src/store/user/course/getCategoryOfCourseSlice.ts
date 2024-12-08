import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import courseService from 'src/service/user/courseService';
import { CourseCategoryResponse } from 'src/types/services/user/course';

interface CourseCategoryState {
    category: CourseCategoryResponse | null;
    isLoading: boolean;
    error: string | null;
}

// Trạng thái ban đầu
const initialState: CourseCategoryState = {
    category: null,
    isLoading: false,
    error: null,
};

// Thunk để gọi API
export const getCategoryOfCourse = createAsyncThunk<
    CourseCategoryResponse, // Kiểu dữ liệu trả về thành công
    number, // Kiểu tham số đầu vào (courseId)
    { rejectValue: string } // Kiểu dữ liệu trả về khi thất bại
>(
    'course/getCategoryOfCourse',
    async (courseId, thunkAPI) => {
        try {
            const response = await courseService.getCategoryOfCourse(courseId);
            return response.data as CourseCategoryResponse;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to fetch course category.'
            );
        }
    }
);

// Slice
const getCategoryOfCourseSlice = createSlice({
    name: 'courseCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryOfCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategoryOfCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.category = action.payload;
            })
            .addCase(getCategoryOfCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Unknown error';
            });
    },
});

export default getCategoryOfCourseSlice.reducer;
