import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserMeData {
  userId: number;
  point: number;
  email: string;
  phoneNumber: string;
  name: string;
  avatarUrl: string;
}

interface UserMeState {
  result: UserMeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserMeState = {
  result: null,
  loading: false,
  error: null,
};

// Mock API để lấy dữ liệu người dùng
const mockUserMeApi = async (): Promise<{ result: UserMeData }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        result: {
          userId: 1,
          point: 100,
          email: "example@example.com",
          phoneNumber: "0123456789",
          name: "John Doe",
          avatarUrl: "https://example.com/avatar.jpg",
        },
      });
    }, 1000); // Giả lập độ trễ 1 giây
  });
};

export const fetchUserMeData = createAsyncThunk(
  "userme/fetchData",
  async (_, thunkAPI) => {
    try {
      const response = await mockUserMeApi(); // Gọi mock API thay vì API thật
      return response.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const usermeSlice = createSlice({
  name: "userme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMeData.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchUserMeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usermeSlice.reducer;
