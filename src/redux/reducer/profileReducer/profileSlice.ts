import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import profileApi from '@/api/profiles/profileApi';
import { getCookie } from '@/cookies';

interface IProfile {
  status: number;
  data: any;
}


export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (lang: string) => {
    const languageId = getCookie('languageId')
    
    const response = (await profileApi.getProfileV3(
      languageId === '1' ? 'vi' : 'en',
    )) as unknown as IProfile;
    return response.data;
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {} as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProfile.pending as any]: (state, action) => {
      state.loading = true;
    },
    [fetchProfile.fulfilled as any]: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    [fetchProfile.rejected as any]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;
