import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from 'src/service/user/accountService';
import { ApiResponse } from 'src/types/services/response/response';
import { UserInfoResponse } from 'src/types/services/user/account';

interface UserInfoState {
    data: ApiResponse<UserInfoResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: UserInfoState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để lấy thông tin user
export const fetchUserInfo = createAsyncThunk(
    'userInfo/fetchUserInfo',
    async (_, thunkAPI) => {
        try {
            const response = await accountService.getUserInfo();
            return response.data as ApiResponse<UserInfoResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const getUserInfoSlice = createSlice({
    name: 'getUserInfoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default getUserInfoSlice.reducer;
