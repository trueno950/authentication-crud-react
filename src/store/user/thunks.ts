import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiCreateUser,
  apiDeleteAccount,
  apiGetUser,
  apiGetUsers,
  apiUpdateUser,
} from "@/apis/usersApi";
import {
  CommonUserInterface,
  CreateUserInfo,
  PagingInterface,
  UserInterface,
} from "@/interfaces";
import { parseErrorAxios } from "@/utils";

export const thunkGetMe = createAsyncThunk<UserInterface, { userId: string }>(
  "me/getMe",
  async (props, { rejectWithValue }) => {
    try {
      const { userId } = props;
      const { data } = await apiGetUser(userId);
      return data.data;
    } catch (err) {
      const result = parseErrorAxios(err);
      throw rejectWithValue(result);
    }
  }
);

export const logoutUser = createAction("me/logout");

export const thunkDeleteAccount = createAsyncThunk<boolean, { userId: string }>(
  "me/deleteAccount",
  async (props, { rejectWithValue }) => {
    try {
      const { userId } = props;
      await apiDeleteAccount(userId);
      return true;
    } catch (err) {
      const result = parseErrorAxios(err);
      throw rejectWithValue(result);
    }
  }
);

export const thunkGetUsers = createAsyncThunk<
  { users: Array<UserInterface>; paging: PagingInterface },
  {
    searchFilter:
      | {
          searchFirstname: string;
          searchLastname: string;
          searchEmail: string;
          searchRoles: { name: string };
          order: string;
        }
      | undefined;
    limit: number;
    currentPage: number;
  }
>(
  "user/getUsers",
  async ({ searchFilter, limit, currentPage }, { rejectWithValue }) => {
    try {
      const filter: any = {};
      const order = { firstName: { direction: "" } };

      if (searchFilter && searchFilter.searchFirstname !== "") {
        filter.firstName = `ILike('${searchFilter.searchFirstname}')`;
      }

      if (searchFilter && searchFilter.searchLastname !== "") {
        filter.lastName = `ILike('${searchFilter.searchLastname}')`;
      }

      if (searchFilter && searchFilter.searchEmail !== "") {
        filter.email = `ILike('${searchFilter.searchEmail}')`;
      }

      if (searchFilter && searchFilter.searchRoles.name !== "") {
        filter.roles = { name: searchFilter.searchRoles.name };
      }

      if (searchFilter && searchFilter.order != "") {
        order.firstName.direction = `${searchFilter.order}`;
      }

      const params = {
        $expand: "roles",
        $top: limit,
        $skip: currentPage * limit,
        $order: JSON.stringify(order),
        $filter: JSON.stringify(filter),
      };
      const { data } = await apiGetUsers(params);
      const users = <Array<UserInterface>>data.data;
      const paging = <PagingInterface>data.paging;
      return { users, paging };
    } catch (err) {
      const result = parseErrorAxios(err);
      throw rejectWithValue(result);
    }
  }
);

export const thunkGetUser = createAsyncThunk<UserInterface, { userId: string }>(
  "user/getUser",
  async (props, { rejectWithValue }) => {
    try {
      const { userId } = props;
      const { data } = await apiGetUser(userId);
      return data.data;
    } catch (err) {
      const result = parseErrorAxios(err);
      throw rejectWithValue(result);
    }
  }
);

export const thunkCreateUser = createAsyncThunk<
  UserInterface,
  { user: CreateUserInfo }
>("user/createUser", async (props, { rejectWithValue }) => {
  try {
    const requestBody = props.user;
    const { data } = await apiCreateUser(requestBody);
    return data.data;
  } catch (error) {
    const result = parseErrorAxios(error);
    throw rejectWithValue(result);
  }
});