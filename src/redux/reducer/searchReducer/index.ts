import searchApi from '@/api/search/apiSearch';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface IData {
  success: boolean;
  data: any;
  message: string;
}

export const fetchSearchResult = createAsyncThunk(
  'search/fetchSearchResult',
  async (params: {
    q: string;
    page: number | null;
    moneyType: number;
    isWorkingWeekend: number;
    isDatePeriod: number;
    salaryMin: number;
    salaryMax: number;
    jobTypeId: any;
    categoryIds: any;
    districtIds: any;
    salaryType: number;
    lang: string;
  }) => {
    const {
      q,
      page,
      moneyType,
      isWorkingWeekend,
      isDatePeriod,
      salaryMin,
      salaryMax,
      jobTypeId,
      categoryIds,
      districtIds,
      salaryType,
      lang,
    } = params;

    const response = (await searchApi.getSearchByQueryV2(
      q,
      page,
      moneyType,
      isWorkingWeekend,
      isDatePeriod,
      null,
      salaryMin,
      salaryMax,
      null,
      null,
      jobTypeId,
      categoryIds,
      districtIds,
      salaryType,
      'vi',
    )) as unknown as IData;

    return response.data;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResult: [] as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchSearchResult.pending as any]: (state, action) => {
      state.loading = true;
    },
    [fetchSearchResult.fulfilled as any]: (state, action) => {
      state.searchResult = action.payload;
      state.loading = false;
    },
    [fetchSearchResult.rejected as any]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },

});

export default searchSlice.reducer;

