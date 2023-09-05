import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetUser } from "@/apis/usersApi";
import { UserInterface } from "@/interfaces";
import { parseErrorAxios } from "@/utils";

export const thunkGetUser = createAsyncThunk<UserInterface, { userId: string }>(
  "user/getUser",
  async (props, { rejectWithValue }) => {
    try {
      const { userId } = props;
      const { data } = await apiGetUser(userId);
      return data;
    } catch (err) {
      const result = parseErrorAxios(err);
      throw rejectWithValue(result);
    }
  }
);

export const logoutUser = createAction("me/logout");
