import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import mCategoryService from 'src/service/admin/mCategoryService';
import { ApiResponse } from 'src/types/services/response/response';

interface MOverviewCategoryState {
    data: ApiResponse<MOverviewCategoryResponse>;
    loading: boolean;
    error: any;
}

const initialState: MOverviewCategoryState = {
    data: {
        code: 0,
        message: '',
        result: {
            totalCategory: 0,
        },
    },
    error: null,
    loading: false,
};

export const fetchMOverviewCategory = createAsyncThunk(
    'fetchMOverviewCategory',
    async (_, thunkApi) => {
        try {
            const response = await mCategoryService.overviewCategory();
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data || 'something went wrong');
        }
    },
);

const mOverviewCategorySlice = createSlice({
    name: 'mOverviewCategorySlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchMOverviewCategory.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchMOverviewCategory.fulfilled.type]: (
            state,
            action: PayloadAction<ApiResponse<MOverviewCategoryResponse>>,
        ) => {
            state.loading = false;
            state.data = action.payload;
        },
        [fetchMOverviewCategory.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default mOverviewCategorySlice.reducer;
