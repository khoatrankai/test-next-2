import axiosClient from "@/configs/axiosClient"

// api/productApi.js
const locationApi = {
  getAllLocation: (lang: string) => {
    const URL = `/v1/locations?lang=${lang}`
    return axiosClient.get(URL)
  },

  getAllProvinces: (lang: string) => {
    const URL = `/v1/locations/p?lang=${lang}`
    return axiosClient.get(URL)
  },

  getDistrictsById: (idProvince: number, lang: string) => {
    const URL = `/v1/locations/d?pid=${idProvince}&lang=${lang}`
    return axiosClient.get(URL)
  },

  getWardsId: (idWard: string, lang: string | null) => {
    const URL = `/v1/locations/w?did=${idWard}&lang=${lang ? lang : 'vi'}`
    return axiosClient.get(URL)
  },
}

export default locationApi



