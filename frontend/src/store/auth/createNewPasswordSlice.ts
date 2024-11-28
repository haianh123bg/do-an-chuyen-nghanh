import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authenticationService from 'src/service/authService';
import { ApiResponse } from 'src/types/services/response/response';
import { CreateNewPassword, LoginResponse } from 'src/types/services/auth/authentication';

interface CreateNewPasswordState {
    data: ApiResponse<LoginResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: CreateNewPasswordState = {
    data: null,
    loading: false,
    error: null,
};

// Async Thunk để gửi yêu cầu tạo mật khẩu mới
export const fetchCreateNewPassword = createAsyncThunk(
    'createNewPassword/fetchCreateNewPassword',
    async (request: CreateNewPassword, thunkAPI) => {
        try {
            const response = await authenticationService.createNewPassword(request.password, request.confirmPassword, request.token );
            return response.data as ApiResponse<LoginResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const createNewPasswordSlice = createSlice({
    name: 'createNewPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateNewPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCreateNewPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCreateNewPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default createNewPasswordSlice.reducer;
