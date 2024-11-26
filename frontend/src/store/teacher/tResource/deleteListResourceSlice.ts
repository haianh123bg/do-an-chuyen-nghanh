import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tResourceService from 'src/service/teacher/tResourceService';

import { ApiResponse } from 'src/types/services/response/response';


interface DeleteListResourceState {
    data: ApiResponse<void> | null;
    loading: boolean;
    error: any | null;
}

const initialState: DeleteListResourceState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchDeleteListResource = createAsyncThunk(
    'fetchDeleteListResource',
    async (resourceIds: number[], thunkAPI
    ) => {
        try {
            const response = await tResourceService.deleteListResource(resourceIds );
            return response.data as ApiResponse<void>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const deleteListResourceSlice = createSlice({
    name: 'deleteListResourceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeleteListResource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeleteListResource.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDeleteListResource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default deleteListResourceSlice.reducer;
