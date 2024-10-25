import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Selected{
    selecteds: string;
}


const initialState: Selected = {
    selecteds: 'personal'
};


const SelectItem = createSlice({
    name: 'select',
    initialState,
    reducers: {
        setSelected(state, action: PayloadAction<string>) {
            state.selecteds = action.payload;
        }
    },
});

export const { setSelected } = SelectItem.actions;
export default SelectItem.reducer;
