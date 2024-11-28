import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import tmCourseService from 'src/service/teacher/tmCourseService';

import { ApiResponse } from 'src/types/services/response/response';


interface createItemState {
    data:  ApiResponse<number>| null;
    loading: boolean;
    error: any | null;
}

const initialState: createItemState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchCreateItem = createAsyncThunk(
    'fetchCreateItem',
    async (
        {
           moduleId, name, description,type
        }: { moduleId: number; name: string;
            description: string,type: string },
        thunkAPI,
    ) => {
        try {
            const response = await tmCourseService.createItem(moduleId, { name, description,type });
            return response.data as ApiResponse<number>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const createItemSlice = createSlice({
    name: 'createItemSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCreateItem.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCreateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default createItemSlice.reducer;
