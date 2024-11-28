import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authenticationService from 'src/service/authService';
import { ApiResponse } from 'src/types/services/response/response';
import { LoginResponse } from 'src/types/services/auth/authentication';

interface LoginGoogleState {
    data: ApiResponse<LoginResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: LoginGoogleState = {
    data: null,
    loading: false,
    error: null,
};

// Async Thunk để gửi yêu cầu đăng nhập bằng Google
export const fetchLoginGoogle = createAsyncThunk(
    'loginGoogle/fetchLoginGoogle',
    async (code: string, thunkAPI) => {
        try {
            const response = await authenticationService.loginGoogle(code);
            return response.data as ApiResponse<LoginResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const loginGoogleSlice = createSlice({
    name: 'loginGoogle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLoginGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLoginGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default loginGoogleSlice.reducer;
