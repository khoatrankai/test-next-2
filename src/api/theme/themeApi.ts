import axiosClient from "@/configs/axiosClient"

const themeApi = {
    getThemesEnable: (lang: string) => {
        const URL = `/v1/themes/enabled?lang=${lang}`
        return axiosClient.get(URL)
    },
}

export default themeApi