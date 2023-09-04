import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import apis from "@/apis";
import { PropsInterface } from "@/interfaces";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/auth/thunks";
import { getToken } from "@/utils";

export const AxiosInterceptor = ({ children }: PropsInterface) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const interceptor = apis.interceptors.request.use(async (config) => {
      try {
        const token = getToken();
        if (token) {
          // @ts-expect-error No se considera error
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token.access_token}`,
          };
        }
      } catch (err) {
        console.log("err", err);
      }

      return config;
    });

    const interceptorResponse = apis.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error?.response?.status === 401) {
          dispatch(logout());
          navigate("/");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apis.interceptors.request.eject(interceptor);
      apis.interceptors.response.eject(interceptorResponse);
    };
  }, []);

  return children;
};
