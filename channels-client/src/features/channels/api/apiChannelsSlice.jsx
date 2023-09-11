import {apiSlice} from "../../../app/api/apiSlice.jsx";

export const channelApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChannels: builder.query({
            query: () => '/channel',
            keepUnusedDataFor: 10000,
        })
    })
})

export const {
    useGetChannelsQuery,
} = channelApiSlice