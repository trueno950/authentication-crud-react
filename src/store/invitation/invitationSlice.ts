import { createSlice } from "@reduxjs/toolkit";
import { InitialStateInvitations } from "@/interfaces/Invitation";
import {
  thunkCreateInvitation,
  thunkDeleteInvitation,
  thunkGetInvitation,
  thunkGetInvitations,
  thunkUpdateInvitation,
} from "./thunks";

const getInitialState = (): InitialStateInvitations => {
  return {
    errorInvitation: undefined,
    loadingInvitation: false,
    invitation: undefined,

    errorInvitations: undefined,
    loadingInvitations: false,
    invitations: [],
  };
};

export const invitationSlice = createSlice({
  name: "invitation",
  initialState: getInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkCreateInvitation.pending, (state) => {
      if (!state.loadingInvitation) state.loadingInvitation = true;
      state.errorInvitation = undefined;
    });
    builder.addCase(thunkCreateInvitation.fulfilled, (state, action) => {
      state.errorInvitation = undefined;
      state.loadingInvitation = false;
      state.invitation = action.payload;
    });
    builder.addCase(thunkCreateInvitation.rejected, (state) => {
      state.loadingInvitation = false;
      state.errorInvitation = {
        error_description: "Ha ocurrido un error al crear la invitación",
      };
    });

    builder.addCase(thunkGetInvitation.pending, (state) => {
      if (!state.loadingInvitation) state.loadingInvitation = true;
      state.errorInvitation = undefined;
    });
    builder.addCase(thunkGetInvitation.fulfilled, (state, action) => {
      state.errorInvitation = undefined;
      state.loadingInvitation = false;
      state.invitation = action.payload;
    });
    builder.addCase(thunkGetInvitation.rejected, (state) => {
      state.loadingInvitation = false;
      state.errorInvitation = {
        error_description:
          "Ha ocurrido un error al obtener la información de la invitación",
      };
    });

    builder.addCase(thunkGetInvitations.pending, (state) => {
      if (!state.loadingInvitations) state.loadingInvitations = true;
      state.errorInvitations = undefined;
    });
    builder.addCase(thunkGetInvitations.fulfilled, (state, action) => {
      state.errorInvitations = undefined;
      state.loadingInvitations = false;
      state.invitations = action.payload;
    });
    builder.addCase(thunkGetInvitations.rejected, (state) => {
      state.loadingInvitations = false;
      state.errorInvitations = {
        error_description:
          "Ha ocurrido un error al obtener la información de las invitaciones",
      };
    });

    builder.addCase(thunkUpdateInvitation.pending, (state) => {
      if (!state.loadingInvitation) state.loadingInvitation = true;
      state.errorInvitation = undefined;
    });
    builder.addCase(thunkUpdateInvitation.fulfilled, (state, action) => {
      state.errorInvitation = undefined;
      state.loadingInvitation = false;
      state.invitation = action.payload;
    });
    builder.addCase(thunkUpdateInvitation.rejected, (state) => {
      state.loadingInvitation = false;
      state.errorInvitation = {
        error_description: "Ha ocurrido un error al actualizar la invitación",
      };
    });

    builder.addCase(thunkDeleteInvitation.pending, (state) => {
      if (!state.loadingInvitation) state.loadingInvitation = true;
      state.errorInvitation = undefined;
    });
    builder.addCase(thunkDeleteInvitation.fulfilled, (state, action) => {
      state.errorInvitation = undefined;
      state.loadingInvitation = false;
      state.invitation = action.payload;
    });
    builder.addCase(thunkDeleteInvitation.rejected, (state) => {
      state.loadingInvitation = false;
      state.errorInvitation = {
        error_description:
          "Ha ocurrido un error al tratar de eliminar la invitación",
      };
    });
  },
});

export default invitationSlice.reducer;