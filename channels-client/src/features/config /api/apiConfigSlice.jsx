import {apiSlice} from "../../../app/api/apiSlice.jsx";

export const configApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveConfig: builder.mutation({
            query: ({...body}) => ({
                url: '/config',
                method: 'POST',
                body: body,
            })
        })
    })
})

export const { useSaveConfigMutation
} = configApiSlice