import axiosClient from "@/configs/axiosClient"

// api/productApi.js
const historyApplicator = {
  getAllSubmitedApplied: (
    threshold: number | null,
    limit: number,
    status: number,
    lang: string
  ) => {
    const URL = `/v1/history/applicator/applications?${
      threshold ? `threshold=${threshold}` : ''
    }&limit=${limit}&lang=${lang}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default historyApplicator
