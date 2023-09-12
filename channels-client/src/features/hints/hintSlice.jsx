import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    hints : [],
}

const hintSlice = createSlice({
    name: 'hintSlice',
    initialState,
    reducers: {
        addHint: (state, action) => {
            const payload = action.payload;
            state.hints.push(payload);
        }
    }
})

export default hintSlice.reducer;
export const {addHint} = hintSlice.actions;