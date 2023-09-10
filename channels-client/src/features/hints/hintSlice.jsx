import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allHints : [],
}

const hintSlice = createSlice({
    name: 'hintSlice',
    initialState,
    reducers: {}
})

export default hintSlice.reducer;