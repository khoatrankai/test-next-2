import axiosClient from '@/configs/axiosClient';

const profileCvsApi = {
  deleteCvs: async (ids: any[]) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/profiles-cvs`;

    return axiosClient.delete(URL, {
      data: {
        ids,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  pushTopCv: async (id: number) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/profiles-cvs/${id}`;

    return axiosClient.put(URL, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
  },
  hideCV: async () => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/profiles-cvs/hide`;

    return axiosClient.put(URL, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
  },
  saveCv: async (data : any) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/profiles-cvs`;

    return axiosClient.post(URL, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
        },
    });
  }
};

export default profileCvsApi;
