// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://localhost:4000',
});

export default axiosInstance;


// import axios from "axios";

// const axiosInstance = axios.create({
//   // 1. استخدام متغير البيئة
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true, // مهم إذا كنت تتعامل مع Cookies
// });

// // 2. Request Interceptor: يضيف التوكن قبل خروج الطلب
// axiosInstance.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// // 3. Response Interceptor: يتعامل مع انتهاء الجلسة
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;