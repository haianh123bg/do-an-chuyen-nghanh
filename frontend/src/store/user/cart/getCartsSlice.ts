import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from 'src/service/user/cartService';
import { ApiResponse } from 'src/types/services/response/response';
import { CartsResponse } from 'src/types/services/user/cart'; // Import kiểu dữ liệu nếu có

interface GetCartsState {
    data: ApiResponse<CartsResponse> | null;
    loading: boolean;
    error: any | null;
}

const initialState: GetCartsState = {
    data: null,
    loading: false,
    error: null,
};

// Action bất đồng bộ để lấy thông tin giỏ hàng
export const fetchGetCarts = createAsyncThunk(
    'carts/getCarts',
    async (_, thunkAPI) => {
        try {
            const response = await cartService.getCarts();
            return response.data as ApiResponse<CartsResponse>;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const getCartsSlice = createSlice({
    name: 'getCartsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCarts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetCarts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchGetCarts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default getCartsSlice.reducer;
