import axiosClient from '@/configs/axiosClient';

const postsApi = {
  getPostNewestV3: (
    childrenCategoryId: number[] | null,
    parentCategoryId: number | null,
    districtIds: any[] | null,
    provinceId: number | null,
    limit: number | null,
    threshold: number | null,
    lang: string,
  ) => {
    const URL =
      `https://web-service-tkv2.onrender.com/api/v3/posts/newest?` +
      `${
        childrenCategoryId
          ? `${childrenCategoryId
              ?.map((n: any, index) => `childrenCategoryId=${n}`)
              .join('&')}&`
          : ``
      }` +
      `${
        parentCategoryId && parentCategoryId !== 1
          ? `&parentCategoryId=${parentCategoryId}&`
          : ``
      }` +
      `${
        districtIds
          ? `${districtIds
              ?.map((n: any, index) => `districtIds=${n}`)
              .join('&')}&`
          : ``
      }` +
      `${provinceId ? `provinceId=${provinceId}&` : ``}` +
      `limit=${limit}${threshold ? `&threshold=${threshold}` : ``}` +
      `&lang=${lang}`;
    return axiosClient.get(URL);
  },

  getPostbyId: (params: number, lang: string) => {
    const URL = `/v1/posts/${params}?lang=${lang}`;
    return axiosClient.get(URL);
  },

  getPostByThemeId: (
    themeId: number | null,
    limit: Number,
    threshold: Number | null,
    lang: string,
  ) => {
    const URL = `v1/posts/theme?${
      themeId ? `tid=${themeId}&` : `tid=1&`
    }limit=${limit}${threshold ? `&threshold=${threshold}` : ``}&lang=${lang}`;
    return axiosClient.get(URL);
  },

  getPostV3: (id: number, lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/posts/${id}?lang=${lang}`;
    return axiosClient.get(URL);
  },
  updateStatusPost: (id: number, status: number) => {
    const URL = `/v1/posts/sta`;
    return axiosClient.put(
      URL,
      {id, status},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },
  updatePostedInfo: (updatePost: any) => {
    const URL = `/v1/posts/inf`

    return axiosClient.put(URL, updatePost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ' Content-Type': 'multipart/form-data',
      },
    })
  },
  createPost: (newPost: any) => {
    const URL = `v1/posts`
    return axiosClient.post(URL, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
  },

};

export default postsApi;
