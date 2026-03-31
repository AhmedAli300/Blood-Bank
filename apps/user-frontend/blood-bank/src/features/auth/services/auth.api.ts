// features/auth/services/auth.api.ts
import axiosInstance from "@/lib/axios";
import { TForget, TLogin, TRegist, TResetPassword } from "../schema/auth.schema";

export const registerApi = (data: TRegist) =>
  axiosInstance.post("/auth/register", data);

export const loginApi = (data: TLogin) =>
  axiosInstance.post("/auth/login", data);

export const forgetPasswordApi = (data: TForget) =>
  axiosInstance.post("/auth/forgot-password", data);

export const resetPasswordApi = (data: TResetPassword) =>
  axiosInstance.post("/auth/reset-password", data);