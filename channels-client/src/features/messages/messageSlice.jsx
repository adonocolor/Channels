import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allMessages : [],
}

const messageSlice = createSlice({
    name: 'hintSlice',
    initialState,
    reducers: {}
})

export default messageSlice.reducer;