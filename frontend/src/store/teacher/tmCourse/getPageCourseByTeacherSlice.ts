import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import tmCourseService from 'src/service/teacher/tmCourseService';

import { ApiResponse } from 'src/types/services/response/response';
import { CourseResponse, PageResponse } from 'src/types/services/teacher/tm_course';

interface getPageCourseByTeacherState {
    data: ApiResponse<PageResponse<CourseResponse>>| null;
    loading: boolean;
    error: any | null;
}

const initialState: getPageCourseByTeacherState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchGetPageCourseByTeacher = createAsyncThunk(
    'fetchGetPageCourseByTeacher',
    async (
        {
            pageNo,pageSize,sortBy,sortDir,searchKey,begin,end,
        }: { pageNo: number,pageSize: number, sortBy: string,sortDir: string,searchKey: string, begin: string,end: string },
        thunkAPI,
    ) => {
        try {
            const response = await tmCourseService.getPageCoursesByTeacher(pageNo,pageSize,sortBy,sortDir,searchKey,begin,end
               
            );
            return response.data as ApiResponse<PageResponse<CourseResponse>>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const getPageCourseByTeacherSlice = createSlice({
    name: 'getPageCourseByTeacherSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetPageCourseByTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetPageCourseByTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchGetPageCourseByTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default getPageCourseByTeacherSlice.reducer;
