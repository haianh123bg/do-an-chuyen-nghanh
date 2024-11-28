import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import tmCourseService from 'src/service/teacher/tmCourseService';

import { ApiResponse } from 'src/types/services/response/response';


interface createCourseState {
    data:  ApiResponse<number>| null;
    loading: boolean;
    error: any | null;
}

const initialState: createCourseState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchCreateCourse = createAsyncThunk(
    'fetchCreateCourse',
    async (
        {
           name, description,
        }: {  name: string;
            description: string },
        thunkAPI,
    ) => {
        try {
            const response = await tmCourseService.createCourse( { name, description });
            return response.data as ApiResponse<number>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const createCourseSlice = createSlice({
    name: 'createModuleSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCreateCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCreateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default createCourseSlice.reducer;
