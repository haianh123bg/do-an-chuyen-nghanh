import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from 'src/service/user/accountService';
import { ApiResponse } from 'src/types/services/response/response';
import { FormChangePassword } from 'src/types/services/user/account';

interface ChangePasswordState {
    data: ApiResponse<void> | null;
    loading: boolean;
    error: any | null;
}

const initialState: ChangePasswordState = {
    data: null,
    loading: false,
    error: null,
};

// Mock API để lấy dữ liệu người dùng
export const fetchChangePassword = createAsyncThunk(
    'fetchchangePassword',
    async (request: FormChangePassword, thunkAPI) => {
        try {
            const response = await accountService.changePassword(request);
            return response.data as ApiResponse<void>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const changePasswordSlice = createSlice({
    name: 'changePasswordSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChangePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default changePasswordSlice.reducer;
