import { ParametersFilters } from "@/interfaces";
import { getEnvironment } from "@/utils";

import apis from "./index";
import { CreateInvitation } from "@/interfaces/Invitation";

const { VITE_API_BASE_URL } = getEnvironment();

export const apiCreateInvitation = (requestBody: CreateInvitation) => {
  return apis.post(`${VITE_API_BASE_URL}/invitations`, requestBody, {
    headers: { "content-type": "application/json" },
  });
};

export const apiGetInvitations = (
  userId: string,
  params?: ParametersFilters
) => {
  return apis.get(`${VITE_API_BASE_URL}/users/${userId}/invitations`, {
    headers: { "content-type": "application/json" },
    params,
  });
};

export const apiGetInvitation = (invitationId: string) => {
  return apis.get(`${VITE_API_BASE_URL}/invitations/${invitationId}`, {
    headers: { "content-type": "application/json" },
  });
};

export const apiUpdateInvitation = (
  invitationId: string,
  requestBody: CreateInvitation
) => {
  return apis.put(
    `${VITE_API_BASE_URL}/invitations/${invitationId}`,
    requestBody,
    {
      headers: { "content-type": "application/json" },
    }
  );
};

export const apiDeleteInvitation = (invitationId: string) => {
  return apis.delete(`${VITE_API_BASE_URL}/invitations/${invitationId}`, {
    headers: { "content-type": "application/json" },
  });
};
