import { createSlice } from '@reduxjs/toolkit'

const showAlert = createSlice({
  name: 'alert',
  initialState: {
    alert: false,
    cancalAlert: false,
    showCopy: false
  },
  reducers: {
    setAlertSave: (state, action) => {
      state.alert = action.payload
      },
      setAlertCancleSave: (state, action) => {
        state.cancalAlert = action.payload
    },
    setShowCopy: (state, action) => {
      state.showCopy = action.payload
    },
  },
})

export const { setAlertSave , setAlertCancleSave, setShowCopy } = showAlert.actions
export default showAlert.reducer
