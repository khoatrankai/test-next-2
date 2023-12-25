import axiosClient from '@/configs/axiosClient';

const nearByApi = {
  getNearByJob: (
    pvId: any[] | null,
    pcid: number | null,
    ccid: number | null,
    limit: Number,
    threshold: Number | null,
    lang: string,
  ) => {
    const URL =
      `/v1/posts/nearby?${
        pvId && pvId.length > 0
          ? `${pvId
              ?.filter((item) => pvId.indexOf(item) === pvId.lastIndexOf(item))
              ?.map((n: any, index) => `pvid=${n}`)
              .join('&')}&`
          : `pvid=${79}&`
      }` +
      `${pcid ? `pcid=${pcid}&` : ``}` +
      `${ccid ? `ccid=${ccid}&` : ``}` +
      `limit=${limit}&threshold=${threshold ? threshold : ''}&lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};

export default nearByApi;
