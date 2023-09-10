import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allChannels : [],
}

const channelSlice = createSlice({
    name: 'hintSlice',
    initialState,
    reducers: {}
})

export default channelSlice.reducer;