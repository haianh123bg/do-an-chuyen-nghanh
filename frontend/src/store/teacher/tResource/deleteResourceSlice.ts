import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tResourceService from 'src/service/teacher/tResourceService';

import { ApiResponse } from 'src/types/services/response/response';


interface DeleteResourceState {
    data: ApiResponse<void> | null;
    loading: boolean;
    error: any | null;
}

const initialState: DeleteResourceState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchDeleteResource = createAsyncThunk(
    'fetchDeleteResource',
    async (resourceId: number, thunkAPI
    ) => {
        try {
            const response = await tResourceService.deleteResource(resourceId );
            return response.data as ApiResponse<void>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const deleteResourceSlice = createSlice({
    name: 'deleteResourceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeleteResource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeleteResource.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDeleteResource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default deleteResourceSlice.reducer;
