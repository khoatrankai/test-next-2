import axiosClient from "@/configs/axiosClient"

// site api
const salaryTypeApi = {
  getJobType: (lang: string) => {
    const URL = `/v1/salary-types?lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default salaryTypeApi
