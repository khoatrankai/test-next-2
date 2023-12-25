// api/productApi.js

import axiosClient from '@/configs/axiosClient';

const searchApi = {
  getSearchByFilter: (lang: string) => {
    const URL = `/v1/search/filter?lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  getSuggestKeyWord: (limit: number, lang: string) => {
    const URL = `/v1/search/suggest?limit=${limit}&lang=${lang}`;

    return axiosClient.get(URL);
  },

  getHistoryKeyWord: (limit: number, lang: string) => {
    const URL = `/v1/search/history?limit=${limit}&lang=${lang}`;
    return axiosClient.get(URL);
  },

  getSearchByQueryV2: (
    q: string | null,
    page: number | null,
    money_type: number | null,
    is_working_weekend: number | null,
    is_remotely: number | null,
    only_company: number | null,
    salary_min: number | null,
    salary_max: number | null,
    start_date: number | null,
    end_date: number | null,
    jobTypeId: number[] | [],
    category_ids: number[] | null,
    district_ids: string[] | null,
    salary_type: number | null,
    lang: string | null,
  ) => {
    const URL =
      `/v2/search?` +
      `${q !== null ? `q=${q}` : ``}` +
      `${page ? `&page=${page}` : ``}` +
      `${salary_min ? `&salary_min=${salary_min}` : ``}` +
      `${salary_max ? `&salary_max=${salary_max}` : ``}` +
      `${salary_type ? `&salary_type=${[salary_type]}` : ``}` +
      `${money_type ? `&money_type=${money_type}` : ``}` +
      `${
        is_working_weekend ? `&is_working_weekend=${is_working_weekend}` : ``
      }` +
      `${is_remotely ? `&is_remotely=${is_remotely}` : ``}` +
      `${only_company ? `&only_company=${only_company}` : ``}` +
      `${start_date ? `&start_date=${start_date}` : ``}` +
      `${end_date ? `&end_date=${end_date}` : ``}` +
      `${jobTypeId.length > 0 ? `&jobTypeId=${jobTypeId}` : ``}` +
      `${
        district_ids != null
          ? `${
              district_ids.length > 0
                ? `&${district_ids
                    ?.map((n, index) => `district_ids[${index}]=${n}`)
                    .join('&')}`
                : `&district_ids`
            }`
          : ''
      }` +
      `${
        category_ids != null
          ? `${
              category_ids.length > 0
                ? `&${category_ids
                    ?.map((n, index) => `category_ids[${index}]=${n}`)
                    .join('&')}`
                : `&category_ids`
            }`
          : ''
      }` +
      `${lang ? `&lang=${lang}` : 'vi'}`;

    return axiosClient.get(URL);
  },

  deleteKeywordSearch: (keyword: string) => {
    const URL = `/v1/search/history`;

    return axiosClient.delete(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        keyword: keyword,
      },
    });
  },
};

export default searchApi;
