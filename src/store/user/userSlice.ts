import { createSlice } from "@reduxjs/toolkit";

import { InitialStateUsers } from "@/interfaces";

import { thunkGetUser } from "./thunks";

const getInitialState = (): InitialStateUsers => {
  return {
    errorUser: undefined,
    loadingUser: false,
    user: undefined,
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkGetUser.pending, (state) => {
      if (!state.loadingUser) state.loadingUser = true;
      state.errorUser = undefined;
    });
    builder.addCase(thunkGetUser.fulfilled, (state, action) => {
      state.errorUser = undefined;
      state.loadingUser = false;
      state.user = action.payload;
    });
    builder.addCase(thunkGetUser.rejected, (state) => {
      state.loadingUser = false;
      state.errorUser = {
        error_description:
          "Ha ocurrido un error al obtener la información del usuario",
      };
    });
  },
});
export default userSlice.reducer;
