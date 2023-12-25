import axios from 'axios'

const messageApi = {
  getChatMessage: (uid: string | null, pid: number, lang: string) => {
    const URL = `https://web-service-tk.onrender.com/api/v1/chats/messages?uid=${uid}&pid=${pid}&lang=${lang}`
    return axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getUserChated: (lang: string) => {
    const URL = `https://web-service-tk.onrender.com/api/v1/chats/users?lang=${lang}`
    return axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  getUnread: (lang: string) => {
    const URL = `https://web-service-tk.onrender.com/api/v1/chats/unread?lang=${lang}`
    return axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}

export default messageApi
