import { ErrorType } from "@/interfaces";

export interface CommonUserInterface {
  email?: string;
  firstName: string;
  lastName: string;
  apartmentNumber: string;
  role: string;
}

export interface UserInterface extends CommonUserInterface {
  createdAt: string;
  id: string;
  updatedAt: string;
}

export interface InitialStateMe {
  error: ErrorType;
  loadingUser: boolean;
  user: UserInterface;
}

export interface CreateUserInfo extends CommonUserInterface {
  password: string;
}

export interface InitialStateUsers {
  errorUser: ErrorType;
  loadingUser: boolean;
  user: UserInterface | undefined;
}
