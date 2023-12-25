/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'i02.appmifile.com',
        'res.cloudinary.com',
      ],
    },
    env: {
      REACT_APP_GOOGLE_CLIENT_ID:
        '436273589347-ot9ec9jhm235q3irsvjpnltr8hsun5cp.apps.googleusercontent.com',
      REACT_APP_FACEBOOK_APP_ID: '523018296116961',
      FIREBASE_API_KEY: "AIzaSyAiVSptcC76hLHviCqdlBrxerk__GQPp1U",
      FIREBASE_AUTH_DOMAIN: "hcmute-firebase-analytics.firebaseapp.com",
      FIREBASE_PROJECT_ID: "hcmute-firebase-analytics",
      FIREBASE_STORAGE_BUCKET: "hcmute-firebase-analytics.appspot.com",
      FIREBASE_MESSAGING_SENDER_ID: "853337971583",
      FIREBASE_APP_ID: "1:853337971583:web:e421660f8eb01e8732184a",
      FIREBASE_MEASUREMENT_ID: "G-MBPSX5L2JJ"
    },
  };
  
  module.exports = nextConfig;