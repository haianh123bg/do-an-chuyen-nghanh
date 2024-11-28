import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from 'src/service/authService';
import { ApiResponse } from 'src/types/services/response/response';
import { RegisterFormRequest, LoginResponse } from 'src/types/services/auth/authentication';


interface RegisterState {
    data: ApiResponse<LoginResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: RegisterState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để đăng ký người dùng
export const fetchRegister = createAsyncThunk(
    'authentication/register',
    async (request: RegisterFormRequest, thunkAPI) => {
        try {
            // Truyền email và password vào hàm register
            const response = await authService.register(request.email, request.password);
            return response.data as ApiResponse<LoginResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const registerSlice = createSlice({
    name: 'registerSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default registerSlice.reducer;
