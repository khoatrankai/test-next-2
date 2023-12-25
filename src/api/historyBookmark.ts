import axiosClient from "@/configs/axiosClient"

// api/productApi.js
const historyBookmark = {
  getAllBookmark: (threshold: number, limit: number, lang: string) => {
    const URL = `/v1/posts/bookmark?threshold=${threshold}&limit=${limit}&lang=${lang}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default historyBookmark
