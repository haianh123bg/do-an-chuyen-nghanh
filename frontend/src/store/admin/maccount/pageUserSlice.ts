import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mAccountService from 'src/service/mAccountService'; // Giả sử bạn đã có service này
import { ApiResponse } from 'src/types/services/response/response';
import {PageResponse, UserResponse } from 'src/types/services/admin/maccount';

// Định nghĩa trạng thái cho slice
interface UserState {
    data: ApiResponse<PageResponse<UserResponse>> | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để lấy danh sách người dùng
export const fetchPageUser = createAsyncThunk(
    'user/fetchPageUser',
    async (params: {
        pageNo: number;
        pageSize: number;
        sortBy: string;
        sortDir: string;
        searchKey: string;
        beginTime: string;
        endTime: string;
    }, thunkAPI) => {
        try {
            const response = await mAccountService.getPageUser(
                params.pageNo,
                params.pageSize,
                params.sortBy,
                params.sortDir,
                params.searchKey,
                params.beginTime,
                params.endTime
            );
            return response.data as ApiResponse<PageResponse<UserResponse>>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPageUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPageUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
