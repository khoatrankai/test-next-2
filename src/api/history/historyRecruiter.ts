import axiosClient from '@/configs/axiosClient';

// api/productApi.js
const historyRecruiter = {
  getAllPosted: (
    page: number | null,
    limit: number,
    status: number | null,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/posts?threshold=${page}&limit=${limit}&status=${status}&lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  GetAllApplicationsOfAJob: (
    post_id: number,
    limit: number,
    threshold: number | null,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/${post_id}/applications?${
      threshold ? `threshold=${threshold}` : ''
    }limit=${limit}&lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  GetInformationAndCandidatesCount: (
    threshold: number,
    limit: number,
    status: string,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/applications?threshold=${threshold}&limit=${limit}&status=${status}&lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  GetAJobApplication: (
    post_id: number,
    application_id: string,
    lang: string,
  ) => {
    const URL = `/v1/history/recruiter/${post_id}/applications/${application_id}?lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};
export default historyRecruiter;
