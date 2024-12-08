import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from 'src/service/user/cartService';
import { ApiResponse } from 'src/types/services/response/response';

interface AddCourseToCartState {
    data: ApiResponse<string> | null;
    loading: boolean;
    error: any | null;
}

const initialState: AddCourseToCartState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để thêm khóa học vào giỏ hàng
export const fetchAddCourseToCart = createAsyncThunk(
    'cart/addCourseToCart',
    async (courseId: number, thunkAPI) => {
        try {
            const response = await cartService.addCourseToCart(courseId);
            return response.data as ApiResponse<string>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const addCourseToCartSlice = createSlice({
    name: 'addCourseToCartSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddCourseToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddCourseToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAddCourseToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default addCourseToCartSlice.reducer;
