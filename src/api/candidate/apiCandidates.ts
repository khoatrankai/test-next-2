import axiosClient from "@/configs/axiosClient";

const candidateSearch = {
  getAcademicTypes: (lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/academic-types?lang=${lang}`
    return axiosClient.get(URL)
  },


  getCandidates: (addresses: any, categories: any, educations: number | undefined, gender: number | undefined, ageMin: number | null, ageMax: number | null, limit: number | null, page: number | null, lang: string) => {


    const URL = `https://web-service-tkv2.onrender.com/api/v3/cv-filter/search?` +
      `${addresses.length !== 0
        ? `&${addresses?.map((n: any, index: number) => `addresses=${n[1]}`).join('&')}`
        : ``
      }` +
      `${categories.length !== 0
        ? `&${categories?.map((n: any, index: number) => `categories=${n[1]}`).join('&')}`
        : ``
      }` +
      // `${educations.length !== 0
      //   ? `&${educations?.map((n: any, index: number) => `educations=${n}`).join('&')}`
      //   : ``
      // }`
      `${educations ? `&educations=${educations}` : ``}` +
      `&${gender === 0 ? `gender=${0}` : gender === 1 ? `gender=${1}` : ""}` +
      `&${ageMin ? `ageMin=${ageMin}` : ``}` +
      `&${ageMax ? `ageMax=${ageMax}` : ``}` +
      `&${limit ? `limit=${limit}` : ``}` +
      `&${page ? `page=${page}` : ``}` +
      `&${lang ? `lang=${lang}` : ``}`;
    return axiosClient.get(URL)
  },

  postBookmarkCandidate: (accountId: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/candidate-bookmarks`
    return axiosClient.post(
      URL,
      { candidateId: accountId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },

  getBookmarkCandidate: (page: number, limit: number, lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/candidate-bookmarks?lang=${lang}&page=${page}&limit=${limit}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },

  postCountShowCandidate: (accountId: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/view-profiles`
    return axiosClient.post(
      URL,
      { profileId: accountId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },

}

export default candidateSearch
