import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notificationService from 'src/service/notificationService';

interface NotificationState {
    data: any[]; // Danh sách các sự kiện nhận được
    loading: boolean;
    error: any | null;
}

const initialState: NotificationState = {
    data: [], // Lưu trữ danh sách sự kiện
    loading: false,
    error: null,
};

// Tạo thunk để khởi động SSE
export const fetchStreamNotification = createAsyncThunk(
    'fetchStreamNotification',
    async (token: string, thunkAPI) => {
        try {
            const eventSource = notificationService.streamNotifications(token);

            eventSource.subscribe((data: any) => {
                // Gửi dữ liệu nhận được vào Redux qua action
                thunkAPI.dispatch(addEvent(data));
            });

            eventSource.onError((error: Event) => {
                // Kết thúc khi có lỗi
                thunkAPI.rejectWithValue(error);
            });

            // Giữ promise không kết thúc vì SSE không có điểm dừng tự nhiên
            return new Promise<void>(() => {}); // Promise không bao giờ resolve hoặc reject
        } catch (error: any) {
            // Xử lý lỗi kết nối SSE
            return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
        }
    }
);


// Tạo slice quản lý state
const streamNotificationsSlice = createSlice({
    name: 'streamNotifications',
    initialState,
    reducers: {
        // Thêm sự kiện mới vào danh sách
        addEvent: (state, action) => {
            state.data.push(action.payload);
        },
        // Reset danh sách sự kiện
        resetEvents: (state) => {
            state.data = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStreamNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStreamNotification.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchStreamNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addEvent, resetEvents } = streamNotificationsSlice.actions;

export default streamNotificationsSlice.reducer;
