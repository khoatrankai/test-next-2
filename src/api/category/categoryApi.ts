import axiosClient from '@/configs/axiosClient';

const categoryApi = {
  getParentCategory: (lang: string) => {
    const URL = `/v1/categories/p?lang=${(lang as any) === '1' ? 'vi' : 'en'}`;
    return axiosClient.get(URL);
  },
  getAllChildCategories: (id: number, lang: string) => {
    const URL = `/v1/categories/c?pid=${id}&lang=${lang}`;
    return axiosClient.get(URL);
  },
  getAllCategorise: (lang: string) => {
    const URL = `/v1/categories?lang=${lang}`
    return axiosClient.get(URL)
  },

};

export default categoryApi;
