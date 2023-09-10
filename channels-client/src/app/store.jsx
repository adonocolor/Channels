import {configureStore} from '@reduxjs/toolkit'
import {apiSlice} from "./api/apiSlice.jsx"
import hintSlice from "../features/hints/hintSlice.jsx";
import messageSlice from "../features/messages/messageSlice.jsx";
import channelSlice from "../features/channels/channelSlice.jsx";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        hintSlice,
        messageSlice,
        channelSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})