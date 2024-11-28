import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tResourceService from 'src/service/teacher/tResourceService';

import { ApiResponse } from 'src/types/services/response/response';
import { ResourceResponse } from 'src/types/services/teacher/resource';

interface UploadListResourceState {
    data: ApiResponse<ResourceResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: UploadListResourceState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchUploadListResource = createAsyncThunk(
    'fetchUploadListResource',
    async (
        formData: FormData, thunkAPI
    ) => {
        try {
            const response = await tResourceService.uploadListResource(formData );
            return response.data as ApiResponse<ResourceResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const uploadListResourceSlice = createSlice({
    name: 'uploadListResourceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadListResource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUploadListResource.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUploadListResource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default uploadListResourceSlice.reducer;
