import axiosClient from '../../configs/axiosClient';

const profileAPi = {
  getProfileV3: (lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/profiles/me?lang=${lang}`;

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  getProfileByAccountId: (lang: string, accountId: string) => {
    // unlock=${unclock}&
    const URL = `https://web-service-tkv2.onrender.com/api/v3/profiles/${accountId}?lang=${lang}&unlock=false`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  putProfileJobV3: (jobTypeId: number | null, isSearch: number | null) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/profiles/job`;
    return axiosClient.put(
      URL,
      {
        jobTypeId,
        isSearch,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    ); // Truyền email vào body của request
  },
  recruitUpdatePassword: (
    newPassword: string,
    oldPassword: string,
    lang: string,
  ) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/users/recruit/update-password?lang=${lang}`;
    return axiosClient.post(
      URL,
      {
        password: newPassword,
        oldPassword: oldPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },

  activityLog: () => {
    const URL = `/v1/application/total`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  activityLogRecruiter: () => {
    const URL = `/v1/application/total`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};
export default profileAPi;
