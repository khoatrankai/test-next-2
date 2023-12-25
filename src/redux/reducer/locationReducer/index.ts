import locationApi from '@/api/location/locationApi';
import axiosClient from '@/configs/axiosClient';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (lang: string) => {
    const response = (await locationApi.getAllLocation(lang)) as unknown as any;
    return response.data;
  },
);

const initialState = {
  data: [] as any,
  loading: false,
  error: null,
};

const locationApiSlice = createSlice({
  name: 'locationApi',
  initialState,
  reducers: {
    setLocationApi: (state, action) => {
      state.data = action.payload.data ?? [];
    },
  },
  extraReducers: {
    [fetchLocation.pending as any]: (state, action) => {
      state.loading = true;
    },
    [fetchLocation.fulfilled as any]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchLocation.rejected as any]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const {setLocationApi} = locationApiSlice.actions;
export default locationApiSlice.reducer;
