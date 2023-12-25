import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: [] as any
};

const profileV3ApiSlice = createSlice({
  name: 'proifileApi',
  initialState,
  reducers: {
    setProfileV3: (state, action) => {
      state.data = action.payload.data ?? [];
    },
  },
});



export const { setProfileV3 } = profileV3ApiSlice.actions;
export default profileV3ApiSlice.reducer;