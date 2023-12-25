import axiosClient from "@/configs/axiosClient"

const bookMarkApi = {
  createBookMark: (postId: number) => {
    const URL = `/v1/bookmarks`
    return axiosClient.post(
      URL,
      { postId: postId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },

  deleteBookMark: (postId: number) => {
    const URL = `/v1/bookmarks`
    return axiosClient.delete(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        postId: postId,
      },
    })
  },
}

export default bookMarkApi
