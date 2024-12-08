import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from 'src/service/user/courseService';
import { PageResponse, CourseResponse } from 'src/types/services/user/course';

interface GetPageCoursesState {
    courses: PageResponse<CourseResponse> | null;
    isLoading: boolean;
    error: string | null;
}

// Trạng thái ban đầu
const initialState: GetPageCoursesState = {
    courses: null,
    isLoading: false,
    error: null,
};

// Thunk để gọi API lấy danh sách khóa học theo trang
export const getPageCourses = createAsyncThunk<
    PageResponse<CourseResponse>, // Kiểu trả về thành công
    { pageNo?: number; pageSize?: number; searchKey?: string }, // Kiểu tham số đầu vào
    { rejectValue: string } // Kiểu trả về khi thất bại
>(
    'courses/getPageCourses',
    async ({ pageNo = 1, pageSize = 8, searchKey = '' }, thunkAPI) => {
        try {
            const response = await courseService.getPageCourses(pageNo, pageSize, searchKey);
            return response.data as PageResponse<CourseResponse>; // Gán kiểu trả về phù hợp
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to fetch courses.'
            );
        }
    }
);


// Slice để quản lý trạng thái
const getPageCoursesSlice = createSlice({
    name: 'getPageCourses',
    initialState,
    reducers: {
        resetCoursesState: (state) => {
            state.courses = null;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPageCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPageCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload;
            })
            .addCase(getPageCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Export reducer và các action
export const { resetCoursesState } = getPageCoursesSlice.actions;
export default getPageCoursesSlice.reducer;
