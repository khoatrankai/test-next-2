import axiosClient from "@/configs/axiosClient"

// site api
const siteApi = {
  getSalaryType: (lang: string) => {
    const URL = `/v1/salary-types?lang=${lang}`
    return axiosClient.get(URL)
  },
  getJobType: (lang: string) => {
    const URL = `/v1/job-types?lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default siteApi
