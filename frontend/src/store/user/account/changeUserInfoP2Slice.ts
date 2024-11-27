import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from 'src/service/user/accountService';
import { ApiResponse } from 'src/types/services/response/response';

interface ChangeUserInfoP2State {
    data: ApiResponse<string> | null;
    loading: boolean;
    error: any | null;
}

const initialState: ChangeUserInfoP2State = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để thay đổi số điện thoại người dùng
export const fetchChangeUserInfoP2 = createAsyncThunk(
    'userInfo/changeUserInfoP2',
    async (phone: string, thunkAPI) => {
        try {
            const response = await accountService.changeUserInfoP2(phone);
            return response.data as ApiResponse<string>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const changeUserInfoP2Slice = createSlice({
    name: 'changeUserInfoP2Slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChangeUserInfoP2.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChangeUserInfoP2.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChangeUserInfoP2.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default changeUserInfoP2Slice.reducer;
