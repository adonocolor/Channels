import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    channels : [],
}

const channelSlice = createSlice({
    name: 'channelSlice',
    initialState,
    reducers: {
        addChannel: (state, action) => {
            const payload = action.payload;
            state.channels.push(payload);
        },
        removeChannel: (state, action) => {
            const payload = action.payload;
            const index = state.channels.indexOf(payload);
            state.channels.splice(index, 1);
        }
    }
})

export default channelSlice.reducer;

export const {addChannel, removeChannel} = channelSlice.actions;
