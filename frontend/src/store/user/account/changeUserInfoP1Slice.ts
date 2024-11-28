import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from 'src/service/user/accountService';
import { ApiResponse } from 'src/types/services/response/response';
import { UserInfoResponse, UserInfoRequest } from 'src/types/services/user/account';

interface ChangeUserInfoP1State {
    data: ApiResponse<UserInfoResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: ChangeUserInfoP1State = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để thay đổi thông tin user (phần 1)
export const fetchChangeUserInfoP1 = createAsyncThunk(
    'userInfo/changeUserInfoP1',
    async (request: UserInfoRequest, thunkAPI) => {
        try {
            const response = await accountService.changeUserInfoP1(request);
            return response.data as ApiResponse<UserInfoResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const changeUserInfoP1Slice = createSlice({
    name: 'changeUserInfoP1Slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChangeUserInfoP1.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChangeUserInfoP1.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChangeUserInfoP1.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default changeUserInfoP1Slice.reducer;
