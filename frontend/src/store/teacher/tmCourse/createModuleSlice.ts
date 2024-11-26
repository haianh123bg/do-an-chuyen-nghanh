import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import tmCourseService from 'src/service/teacher/tmCourseService';

import { ApiResponse } from 'src/types/services/response/response';


interface createModuleState {
    data:  ApiResponse<number>| null;
    loading: boolean;
    error: any | null;
}

const initialState: createModuleState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchCreateModule = createAsyncThunk(
    'fetchCreateModule',
    async (
        {
           courseId, name, description,
        }: { courseId: number; name: string;
            description: string },
        thunkAPI,
    ) => {
        try {
            const response = await tmCourseService.createModule(courseId, { name, description });
            return response.data as ApiResponse<number>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const createModuleSlice = createSlice({
    name: 'createModuleSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateModule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCreateModule.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCreateModule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default createModuleSlice.reducer;
