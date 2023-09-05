import { ErrorType, UserInterface } from "@/interfaces";

export interface AuthInfoInterface {
  access_token: string;
  user?: UserInterface
}

export interface ParamsLoginInterface {
  email: string;
  password: string;
}

export interface InitialStateAuth {
  errorCreatingUser: ErrorType;
  creatingUser: boolean;
  userCreated: UserInterface | undefined;

  loading: boolean;
  error: ErrorType;
  refreshingToken: boolean;
  errorRefreshingToken: ErrorType;
  logged: boolean;
  token_info: undefined | AuthInfoInterface;

  errorRecoverPassword: ErrorType;
  recoveringPassword: boolean
}
