import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    hints : [],
}

const hintSlice = createSlice({
    name: 'hintSlice',
    initialState,
    reducers: {}
})

export default hintSlice.reducer;