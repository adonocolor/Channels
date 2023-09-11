import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
}

const messageSlice = createSlice({
    name: 'hintSlice',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const payload = action.payload;

            if (payload.message === "" || !payload.message) {
                return;
            }

            for (let i = 0; i  < state.messages.length; i++) {
                if (state.messages[i].channelId === payload.currentChannel) {
                    state.messages[i].text = payload.message;
                    return;
                }
            }

            const message = {
                channelId: payload.currentChannel,
                text: payload.message,
            }

            state.messages.push(message);
        }
    }
})

export default messageSlice.reducer;
export const {addMessage} = messageSlice.actions;
