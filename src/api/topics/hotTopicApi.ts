import axiosClient from '@/configs/axiosClient';

const hotTopicApi = {
  getAllTopics: () => {
    const url = `https://web-service-tkv2.onrender.com/api/v3/topics`;

    return axiosClient.get(url);
  },

  getHotJobById: (
    url: any,
    page: number,
    limit: number,
    lang: string,
    provinceId: string | null,
  ) => {
    const URL =
      url +
      `&page=${page}&limit=${limit}&lang=${lang}&provinceId=${provinceId}`;
    return axiosClient.get(URL);
  },
};

export default hotTopicApi;
