import { CreateUserInfo, ParamsLoginInterface } from "@/interfaces";
import { getEnvironment, getToken } from "@/utils";

import apis from "./index";

const { VITE_API_BASE_URL } = getEnvironment();

export const apiCreateUser = (requestBody: CreateUserInfo) => {
  return apis.post(`${VITE_API_BASE_URL}/auth/register`, requestBody, {
    headers: { "content-type": "application/json" },
  });
};

export const apiLogin = (params: ParamsLoginInterface) => {
  console.log("params", params, VITE_API_BASE_URL);
  return apis.post(`${VITE_API_BASE_URL}/auth/login`, params);
};

export const apiLogout = () => {
  const token = getToken();
  return apis.post(`${VITE_API_BASE_URL}/logout`, {
    refresh_token: token.refresh_token,
  });
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
