import axios from "axios"

const appplicationApi = {
  updateApplication: (id: number, status: number) => {
    const URL = `https://web-service-tk.onrender.com/api/v1/application/update`

    return axios.put(
      URL,
      { id, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },
  applyAplication: (postId: Number) => {
    const URL = `https://web-service-tk.onrender.com/api/v1/application/create`
    return axios.post(URL, { postId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default appplicationApi
