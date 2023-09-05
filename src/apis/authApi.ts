import { CreateUserInfo, ParamsLoginInterface } from "@/interfaces";
import { getEnvironment } from "@/utils";

import apis from "./index";

const { VITE_API_BASE_URL } = getEnvironment();

export const apiCreateUser = (requestBody: CreateUserInfo) => {
  return apis.post(`${VITE_API_BASE_URL}/auth/register`, requestBody, {
    headers: { "content-type": "application/json" },
  });
};

export const apiLogin = (params: ParamsLoginInterface) => {
  return apis.post(`${VITE_API_BASE_URL}/auth/login`, params);
};

export const apiRecoverPassword = (email: string) => {
  return apis.post(
    `${VITE_API_BASE_URL}/auth/forgot-password`,
    { email },
    {
      headers: { "content-type": "application/json" },
    }
  );
};

export const apiChangePassword = (password: string, token: string) => {
  return apis.patch(
    `${VITE_API_BASE_URL}/auth/reset-password`,
    { token, newPassword: password },
    {
      headers: { "content-type": "application/json" },
    }
  );
};
