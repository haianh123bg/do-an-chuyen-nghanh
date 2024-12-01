import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from 'src/service/authService';
import { LoginResponseType } from 'src/types/auth/auth';
import { ApiResponse } from 'src/types/services/response/response';

interface LoginState {
    loading: boolean;
    error: any;
    data: ApiResponse<LoginResponseType>;
}

const initialState: LoginState = {
    loading: false,
    data: {
        code: 0,
        message: '',
        result: {
            accessToken: '',
            refreshToken: '',
            roles: [],
            userId: 0,
        },
    },
    error: null,
};

export const fetchLogin = createAsyncThunk(
    'fetchLogin',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await authService.login(email, password);
            return response.data as ApiResponse<LoginResponseType>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
