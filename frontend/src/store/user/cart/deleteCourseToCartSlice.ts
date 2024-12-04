import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from 'src/service/user/cartService';
import { ApiResponse } from 'src/types/services/response/response';

interface DeleteCourseToCartState {
    data: ApiResponse<string> | null;
    loading: boolean;
    error: any | null;
}

const initialState: DeleteCourseToCartState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để xóa khóa học khỏi giỏ hàng
export const fetchDeleteCourseToCart = createAsyncThunk(
    'cart/deleteCourseToCart',
    async (courseId: number, thunkAPI) => {
        try {
            const response = await cartService.deleteCourseFromCart(courseId);
            return response.data as ApiResponse<string>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const deleteCourseToCartSlice = createSlice({
    name: 'deleteCourseToCartSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeleteCourseToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeleteCourseToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDeleteCourseToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default deleteCourseToCartSlice.reducer;
