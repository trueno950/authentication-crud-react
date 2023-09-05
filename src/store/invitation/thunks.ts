import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateInvitation, InvitationInterface } from "@/interfaces/Invitation";
import {
  apiCreateInvitation,
  apiDeleteInvitation,
  apiGetInvitation,
  apiGetInvitations,
  apiUpdateInvitation,
} from "@/apis/invitationsApi";
import { parseErrorAxios } from "@/utils";
import { ParametersFilters } from "../../interfaces";

export const thunkCreateInvitation = createAsyncThunk<
  InvitationInterface,
  { invitation: InvitationInterface }
>("invitation/createInvitation", async (props, { rejectWithValue }) => {
  try {
    const { invitation } = props;
    const { data } = await apiCreateInvitation(invitation);
    return data;
  } catch (err) {
    const result = parseErrorAxios(err);
    throw rejectWithValue(result);
  }
});

export const thunkGetInvitation = createAsyncThunk<
  InvitationInterface,
  { invitationId: string }
>("invitation/getInvitation", async (props, { rejectWithValue }) => {
  try {
    const invitationId = props.invitationId;
    const { data } = await apiGetInvitation(invitationId);
    return data;
  } catch (err) {
    const result = parseErrorAxios(err);
    throw rejectWithValue(result);
  }
});

export const thunkGetInvitations = createAsyncThunk<
  InvitationInterface[],
  { userId: string; params: ParametersFilters }
>("invitation/getInvitations", async (props, { rejectWithValue }) => {
  try {
    const { userId, params } = props;
    const { data } = await apiGetInvitations(userId, params);
    return data;
  } catch (err) {
    const result = parseErrorAxios(err);
    throw rejectWithValue(result);
  }
});

export const thunkUpdateInvitation = createAsyncThunk<
  InvitationInterface,
  { invitation: CreateInvitation; invitationId: string }
>("invitation/updateInvitation", async (props, { rejectWithValue }) => {
  try {
    const { invitation, invitationId } = props;
    const { data } = await apiUpdateInvitation(invitationId, invitation);
    return data;
  } catch (err) {
    const result = parseErrorAxios(err);
    throw rejectWithValue(result);
  }
});

export const thunkDeleteInvitation = createAsyncThunk<
  InvitationInterface,
  { invitationId: string }
>("invitation/deleteInvitation", async (props, { rejectWithValue }) => {
  try {
    const invitationId = props.invitationId;
    const { data } = await apiDeleteInvitation(invitationId);
    return data;
  } catch (err) {
    const result = parseErrorAxios(err);
    throw rejectWithValue(result);
  }
});
