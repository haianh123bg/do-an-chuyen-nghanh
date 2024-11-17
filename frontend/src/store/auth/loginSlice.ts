import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponseType } from 'src/types/auth/auth';

interface PropsResponse {
    code: number;
    message?: string;
    result?: LoginResponseType;
}

interface PropInit {
    loading: boolean;
    data: PropsResponse;
    error: any;
}

const initialState: PropInit = {
    loading: false,
    data: {
        code: 0,

        result: {
            accessToken: '',
            refreshToken: '',
            roles: [],
            userId: 0,
        },
    },
    error: null,
};

const SelectItem = createSlice({
    name: 'select',
    initialState,
    reducers: {
        resetStore(state, action: PayloadAction<PropsResponse>) {
            state.data = action.payload;
        },
    },
});

export const { resetStore } = SelectItem.actions;
export default SelectItem.reducer;
