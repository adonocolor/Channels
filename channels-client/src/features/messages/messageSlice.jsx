import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allMessages: [],
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

            for (let i = 0; i  < state.allMessages.length; i++) {
                if (state.allMessages[i].channelId === payload.currentChannel) {
                    state.allMessages[i].text = payload.message;
                    return;
                }
            }

            const message = {
                channelId: payload.currentChannel,
                text: payload.message,
            }

            state.allMessages.push(message);
        }
    }
})

export default messageSlice.reducer;
export const {addMessage} = messageSlice.actions;
