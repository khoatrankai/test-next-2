import languageApi from '@/api/language/languageApi';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
interface ProfileState {
  languages: any;
  error: string | null;
}

const initialState: ProfileState = {
  languages: null,
  error: null,
};

export const getLanguages = createAsyncThunk(
  'getLanguage',
  async (selectedLanguage: string, {getState, rejectWithValue}) => {
    try {
      const response = await languageApi.getLanguage(
        selectedLanguage
          ? Number(selectedLanguage) === 1
            ? 'vi'
            : 'en'
          : // languageRedux &&
            'vi',
      );

      return response.data;
    } catch (error) {
      console.log('error: ' + error);
    }
  },
);

const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    resetLanguageState: (state) => {
      state.languages = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLanguages.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.languages = action.payload;
        state.error = null;
      },
    );

    builder.addCase(
      getLanguages.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.languages = null;
        state.error = action.payload as string;
      },
    );
  },
});

export const {resetLanguageState} = languageSlice.actions;
export default languageSlice.reducer;
