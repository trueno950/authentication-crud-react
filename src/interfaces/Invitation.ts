import { ErrorType, UserInterface } from "@/interfaces";

export interface CommonInvitationInterface {
  guestName?: string;
  entryDate: Date;
  expirationDate: Date;
  user: UserInterface;
}

export interface InvitationInterface extends CommonInvitationInterface {
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface CreateInvitation extends InvitationInterface {}

export interface InitialStateInvitations {
  errorInvitation: ErrorType;
  loadingInvitation: boolean;
  invitation: InvitationInterface | undefined;

  errorInvitations: ErrorType;
  loadingInvitations: boolean;
  invitations: InvitationInterface[] | undefined;
}
