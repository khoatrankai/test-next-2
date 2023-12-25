import axiosClient from "@/configs/axiosClient"

// site api
const jobTypeApi = {
  getJobType: (lang: string) => {
    const URL = `/v1/job-types?lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default jobTypeApi
