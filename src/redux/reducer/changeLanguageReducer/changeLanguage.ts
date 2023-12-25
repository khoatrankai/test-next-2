import { createSlice } from '@reduxjs/toolkit'

const changeLaguage = createSlice({
    name: 'changeLaguage',
    initialState: {
        language: sessionStorage.getItem('languageId') === '2' ? 2 : 1,
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload
        },
    },
})

export const { setLanguage } = changeLaguage.actions
export default changeLaguage.reducer
