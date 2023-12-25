import axiosClient from '@/configs/axiosClient';

const signInEmailApi = {
  signInEmail: (email: string) => {
    const URL = `/v1/sign-in/email`;
    return axiosClient.post(URL, {email});
  },

  verifyOtp: (email: String, otp: string) => {
    const URL = `/v1/sign-in/email/verify`;
    return axiosClient.post(URL, {email, otp});
  },

  signInGoogle: (idToken: string) => {
    const URL = `/v1/sign-in/google`;

    return axiosClient.post(URL, {
      idToken: idToken,
      isWeb: true,
    });
  },

  signInFacebook: (fbAccessToken: string) => {
    const URL = `/v1/sign-in/facebook`;
    return axiosClient.post(URL, {fbAccessToken});
  },

  signOut: (refreshToken: string) => {
    const URL = `/v1/sign-out`;
    return axiosClient.post(URL, {refreshToken: refreshToken});
  },

  signInRecruit: (email: string, password: string) => {
    const URL = `/v1/sign-in/recruiter`;
    return axiosClient.post(URL, {email, password});
  },

  signInEmailRecruit: (email: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/users/sign-up`;
    return axiosClient.post(URL, {email});
  },

  verifyOtpRecruit: (email: String, otp: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/users/verify-otp`;
    return axiosClient.post(URL, {email, otp});
  },

  verifyConfirmPassword: (email: string, password: string) => {
    const URL = `https://web-service-tkv2.onrender.com/api/v3/users/confirm-password`;
    return axiosClient.post(URL, {email, password});
  }
};

export default signInEmailApi;
