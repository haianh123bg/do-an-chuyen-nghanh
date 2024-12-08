import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryService from 'src/service/user/categoryService';
import { ApiResponse } from 'src/types/services/response/response';

interface CategoryResponse {
    id: number;
    name: string;
    description?: string;
}

interface GetCategoriesState {
    data: ApiResponse<CategoryResponse[]> | null;
    loading: boolean;
    error: any | null;
}

const initialState: GetCategoriesState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để lấy danh sách danh mục
export const fetchGetCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await categoryService.getCategories();
            return response.data as ApiResponse<CategoryResponse[]>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const getCategoriesSlice = createSlice({
    name: 'getCategoriesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchGetCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default getCategoriesSlice.reducer;
