import { ErrorType, UserInterface } from "@/interfaces";
import { Dayjs } from "dayjs";

export interface CommonInvitationInterface {
  guestName: string;
  entryDate: string;
  expirationDate: string;
  userId: string;
}

export interface InvitationInterface {
  guestName: string;
  entryDate: Dayjs;
  expirationDate: Dayjs;
  user?: UserInterface;
  createdAt: Dayjs;
  id?: string;
  updatedAt: Dayjs;
}

export interface CreateInvitation extends CommonInvitationInterface {}

export interface InitialStateInvitations {
  errorInvitation: ErrorType;
  loadingInvitation: boolean;
  invitation: InvitationInterface | undefined;

  errorInvitations: ErrorType;
  loadingInvitations: boolean;
  totalItems: number;
  invitations: InvitationInterface[] | undefined;
}
