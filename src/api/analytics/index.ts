import axiosClient from "@/configs/axiosClient"

const analyticsApi = {
    totalPosts: () => {
        const URL = `https://web-service-tkv2.onrender.com/api/v3/posts/total-post`

        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    },
    totalApplications: (type?: string) => {
        const URL = `/v1/application/total${type ? `?type=${type}` : ''}`

        return axiosClient.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    }
}

export default analyticsApi