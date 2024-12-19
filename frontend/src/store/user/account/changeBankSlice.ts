import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountService from 'src/service/user/accountService';
import { ApiResponse } from 'src/types/services/response/response';
import { FormChangeBank } from 'src/types/services/user/account';

interface ChangeBankState {
    data: ApiResponse<void> | null;
    loading: boolean;
    error: any | null;
}

const initialState: ChangeBankState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để thay đổi avatar
export const fetchChangeBank = createAsyncThunk(
    'user/account/changeBank',
    async (request: FormChangeBank, thunkAPI) => {
        try {
            const response = await accountService.changeBank(request);
            return response.data as ApiResponse<void>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    },
);

const changeBankSlice = createSlice({
    name: 'changeBankSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChangeBank.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChangeBank.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChangeBank.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default changeBankSlice.reducer;
