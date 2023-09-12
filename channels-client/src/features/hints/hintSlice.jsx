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
        },
        deleteLastHint: (state, action) => {
            const payload = action.payload;
            let index = state.hints.findLastIndex(hint => hint.channelId === payload);
            state.hints.splice(index, 1);
        }
    }
})

export default hintSlice.reducer;
export const {addHint, deleteLastHint} = hintSlice.actions;