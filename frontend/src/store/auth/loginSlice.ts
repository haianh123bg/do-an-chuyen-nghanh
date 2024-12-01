import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authService from 'src/service/authService';
import { LoginResponseType } from 'src/types/auth/auth';
import { ApiResponse } from 'src/types/services/response/response';

interface LoginState {
    loading: boolean;
    error: any;
    data: ApiResponse<LoginResponseType> | null;
}

const initialState: LoginState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchLogin = createAsyncThunk(
    'fetchLogin',
    async ({ account, password }: { account: string; password: string }, thunkAPI) => {
        try {
            const response = await authService.login(account, password);
            return response.data as ApiResponse<LoginResponseType>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        resetStore(state, action: PayloadAction<ApiResponse<LoginResponseType>>) {
            state.data = action.payload;
        },
    },
});

export const { resetStore } = loginSlice.actions;
export default loginSlice.reducer;
