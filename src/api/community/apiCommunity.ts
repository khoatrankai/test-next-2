// api/productApi.js

import axiosClient from '@/configs/axiosClient';

export interface FormCommunity {
  title: string;
  content: string;
  images: File[] | null;
}

export interface FormPutCommunity {
  title: string;
  content: string;
  type: number;
  images: string[];
  categoryId: string[];
  id: number;
  status: number;
}

export interface FormPostCommunityComment {
  communicationId: number;
  content: string;
  images: string[];
}

const communityApi = {
  postCommunications: (newCommunity: FormCommunity) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications`;
    return axiosClient.post(URL, newCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteComent: (postId: any, cmtId: any) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-comments/${postId}/${cmtId}`;
    return axiosClient.delete(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCommunitations: (
    page: string,
    limit: string,
    sort: string,
    type: number,
  ) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications?page=${page}&limit=${limit}&sort=${sort}&type=${type}`;
    return axiosClient.get(URL);
  },

  getCommunityNews: (
    page: string,
    limit: string,
    sort: string,
    type: number,
    lang: any,
  ) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/news?page=${page}&limit=${limit}&sort=${sort}&type=${type}&lang=${lang}`;
    return axiosClient.get(URL);
  },

  getCommunityWorkingStory: () => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/working-story`;
    return axiosClient.get(URL);
  },

  getCommunityTodayByAccount: (page: string, limit: string, sort: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/today/by-account?page=${page}&limit=${limit}&sort=${sort}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  getCommunityByAccount: (
    page: string,
    limit: string,
    sort: string,
    lang: any,
  ) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/by-account?page=${page}&limit=${limit}&sort=${sort}&lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  putCommunityByAccount: (id: number, putCommunity: FormPutCommunity) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/${id}`;
    return axiosClient.put(URL, putCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCommunityToday: (page: string, limit: string, sort: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/today?page=${page}&limit=${limit}&sort=${sort}`;
    return axiosClient.get(URL);
  },

  getCommunityShareId: (id: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/share/${id}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  getCommunityDetailId: (id: string, lang: any) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/detail/${id}?lang=${lang}`;
    return axiosClient.get(URL);
  },

  // ---------------------------------------------------------------------------------------- ADMIN
  postCommunityByAdmin: (newCommunityAdmin: FormCommunity) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/by-admin`;
    return axiosClient.post(URL, newCommunityAdmin, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  putCommunityByAdmin: (id: number, newCommunityAdmin: FormPutCommunity) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/by-admin/${id}`;
    return axiosClient.put(URL, newCommunityAdmin, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // ---------------------------------------------------------------------------------------- lIKE

  postCommunityLike: (communicationId: number) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-likes`;
    return axiosClient.post(
      URL,
      {
        communicationId: communicationId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  },

  getCommunityLike: (id: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-likes/${id}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  // ---------------------------------------------------------------------------------------- Comment

  postCommunityCommentByAdmin: (
    newCommentCommunity: FormPostCommunityComment,
  ) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communications/by-admin`;
    return axiosClient.post(URL, newCommentCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  postCommunityComment: (newCommentCommunity: FormPostCommunityComment) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-comments`;
    return axiosClient.post(URL, newCommentCommunity, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCommunityComment: (id: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-comments/${id}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  putCommunityComment: (
    communicationId: number,
    commentId: number,
    putCommunityComment: FormPutCommunity,
  ) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-comments/${communicationId}/${commentId}`;
    return axiosClient.put(URL, putCommunityComment, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // ---------------------------------------------------------------------------------------- bookmarked

  postCommunityBookmarked: (communicationId: number) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-bookmarked`;
    return axiosClient.post(
      URL,
      {
        communicationId: communicationId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  },

  getCommunityBookmarked: (page: number) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/communication-bookmarked?page=${page}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};

export default communityApi;
