import { createSlice } from "@reduxjs/toolkit";

const categoryIdReducer = createSlice({
  name: "categoryId",
  initialState: {
    categoryId: 0,
  },
  reducers: {
    setCategoryId: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCategoryId } = categoryIdReducer.actions;

export default categoryIdReducer.reducer;
