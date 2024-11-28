import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authenticationService from 'src/service/authService';
import { ApiResponse } from 'src/types/services/response/response';

interface ForgotPasswordState {
    data: ApiResponse<void> | null;
    loading: boolean;
    error: any | null;
}

const initialState: ForgotPasswordState = {
    data: null,
    loading: false,
    error: null,
};

// Async Thunk để gửi yêu cầu quên mật khẩu
export const fetchForgotPassword = createAsyncThunk(
    'forgotPassword/fetchForgotPassword',
    async (email: string, thunkAPI) => {
        try {
            const response = await authenticationService.forgotPassword(email);
            return response.data as ApiResponse<void>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchForgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchForgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchForgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default forgotPasswordSlice.reducer;
