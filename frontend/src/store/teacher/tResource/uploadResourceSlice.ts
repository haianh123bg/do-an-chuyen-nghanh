import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tResourceService from 'src/service/teacher/tResourceService';

import { ApiResponse } from 'src/types/services/response/response';
import { ResourceResponse } from 'src/types/services/teacher/resource';

interface UploadResourceState {
    data: ApiResponse<ResourceResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: UploadResourceState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchUploadResource = createAsyncThunk(
    'fetchUploadResource',
    async (
        formData: FormData, thunkAPI
    ) => {
        try {
            const response = await tResourceService.uploadResource(formData );
            return response.data as ApiResponse<ResourceResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const uploadResourceSlice = createSlice({
    name: 'uploadResourceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadResource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUploadResource.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUploadResource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default uploadResourceSlice.reducer;
