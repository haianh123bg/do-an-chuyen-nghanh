import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from 'src/service/user/accountService';
import { ApiResponse } from 'src/types/services/response/response';

interface AvatarState {
    data: ApiResponse<string> | null;
    loading: boolean;
    error: any | null;
}

const initialState: AvatarState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để thay đổi avatar
export const fetchChangeAvatar = createAsyncThunk(
    'avatar/changeAvatar',
    async (avatar: File, thunkAPI) => {
        try {
            const response = await accountService.changeAvatar(avatar); // Sử dụng accountService
            return response.data as ApiResponse<string>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const changeAvatarSlice = createSlice({
    name: 'changeAvatarSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChangeAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChangeAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChangeAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default changeAvatarSlice.reducer;
