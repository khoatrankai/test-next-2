import { createSlice } from '@reduxjs/toolkit'

const dataCheckPost = createSlice({
    name: 'dataCheckPost',
    initialState: {
        data: {},
    },
    reducers: {
        setDataCheckPost: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { setDataCheckPost } = dataCheckPost.actions
export default dataCheckPost.reducer
