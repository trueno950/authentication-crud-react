import { AuthInfoInterface } from "@/interfaces";

export const setToken = (tokenInfo: AuthInfoInterface) => {
  localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("tokenInfo") || "null");
};

export const removeToken = () => {
  localStorage.removeItem("tokenInfo");
};
