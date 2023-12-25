// api/productApi.js

import axiosClient from "@/configs/axiosClient"

const bannersApi = {
  getBannersApi: (lang: string, order: string | null ) => {
    const URL = `/v1/banners/ena?v=1${order ? `&order=${order}`: ""}&lang=${lang}`
    return axiosClient.get(URL)
  },
}

export default bannersApi
