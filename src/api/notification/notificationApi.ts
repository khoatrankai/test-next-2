import axiosClient from "@/configs/axiosClient"

const notificationApi = {
  getNotification: (lang: string) => {
    const URL = `/v1/notification/all?lang=${lang}`

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default notificationApi
