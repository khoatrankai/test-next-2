import axiosClient from '@/configs/axiosClient';

export interface FormCompanyValues {
  // id: string;
  name: string;
  address: string;
  wardId: string;
  taxCode: string;
  phone: string;
  email: string | null;
  website: string | null;
  description: string;
  companyRoleId: number | null;
  companySizeId: number | null;
  categoryId: number | null;
  logo: string;
}

const apiCompany = {
  createCampany: (newCompany: FormCompanyValues) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/companies`;
    return axiosClient.post(URL, newCompany, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateCampany: (companyId: number, updateCompany: FormCompanyValues) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/companies/${companyId}`;

    return axiosClient.patch(URL, updateCompany, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ' Content-Type': 'multipart/form-data',
      },
    });
  },
  getAllRolesCompany: (lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/company-roles?lang=${lang}`;
    return axiosClient.get(URL);
  },
  getAllSizesCompany: (lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/company-sizes?lang=${lang}`;
    return axiosClient.get(URL);
  },
  getAllCompany: (page: number, limit: number) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/companies?page=${page}&limit=${limit}`;
    return axiosClient.get(URL);
  },
  getDetailCompany: (id: number, lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/companies/${id}?lang=${lang}`;
    return axiosClient.get(URL);
  },
  postCompanyRating: (companyId: any, star: any, comment: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/company-ratings`;
    return axiosClient.post(
      URL,
      {companyId, star, comment},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },
  getReviewAccountOfCompany: (id: any, lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/company-ratings/account/company/${id}?lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  getCompanyRating: (id: any, page: any, limit: any, lang: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/company-ratings/company/${id}?lang=${lang}&limit=${limit}&page=${page}`;
    return axiosClient.get(URL);
  },
  deleteCompanyReview: (id: any) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/company-ratings/account/company/${id}`;
    return axiosClient.delete(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  filterCompany: (
    addresses: any,
    categories: any,
    companySizeId: number | undefined,
    limit: number | null,
    page: number | null,
    lang: string,
  ) => {
    const URL =
      `https://web-service-tkv2.onrender.com/api/v3/companies/search?` +
      `${page ? `&page=${page}` : `page=0`}` +
      `${limit ? `&limit=${limit}` : ``}` + 
      `${
        addresses.length > 0
          ? `&${addresses
              ?.map((n: any, index: number) => `addresses=${n[1]}`)
              .join('&')}`
          : ``
      }` +
      `${
        categories.length > 0
          ? `&${categories
              ?.map((n: any, index: number) => `categories=${n[0]}`)
              .join('&')}`
          : ``
      }` +
      `${companySizeId ? `&companySizeId=${companySizeId}` : ``}` +
      `${lang ? `&lang=${lang}` : ``}`;

    return axiosClient.get(URL);
  },
};

export default apiCompany;
