import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import accountService from 'src/service/user/accountService';
import { ApiResponse } from 'src/types/services/response/response';
import { GenderEnum, UserInfoResponse } from 'src/types/services/user/account';

interface UserInfoState {
    data: ApiResponse<UserInfoResponse>;
    loading: boolean;
    error: any | null;
}

const initialState: UserInfoState = {
    data: {
        code: 0,
        message: '',
        result: {
            email: '',
            accountName: '',
            accountNumber: '',
            address: '',
            avatar: '',
            bankBranch: '',
            bankCode: '',
            bankName: '',
            date: '',
            gender: GenderEnum.FEMALE,
            name: '',
            phoneNumber: '',
            userId: 0,
        },
    },
    loading: false,
    error: null,
};

// Action bất đồng bộ để lấy thông tin user
export const fetchGetUserInfo = createAsyncThunk('fetchGetUserInfo', async (_, thunkAPI) => {
    try {
        const response = await accountService.getUserInfo();
        return response.data as ApiResponse<UserInfoResponse>;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
});

const getUserInfoSlice = createSlice({
    name: 'getUserInfoSlice',
    initialState,
    reducers: {
        setAvatar: (state, action: PayloadAction<string>) => {
            state.data.result.avatar = action.payload;
        },
        setUserInfoResponse: (state, action: PayloadAction<UserInfoResponse>) => {
            state.data.result = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchGetUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setAvatar, setUserInfoResponse } = getUserInfoSlice.actions;
export default getUserInfoSlice.reducer;
