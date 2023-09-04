import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import {
  apiChangePassword,
  apiCreateUser,
  apiLogin,
  apiLogout,
  apiRecoverPassword,
} from '@/apis/authApi'
import {
  AuthInfoInterface,
  CreateUserInfo,
  ParamsLoginInterface,
  SerializedError,
  UserInterface,
  ValidationErrorsInterface
} from '@/interfaces'
import { parseErrorAxios } from '@/utils'

export const logout = createAction('auth/logout')

export const thunkRegisterUser = createAsyncThunk<UserInterface, { user: CreateUserInfo }>(
  'user/createUser',
  async (props, { rejectWithValue }) => {
    try {
      const requestBody = props.user
      const { data } = await apiCreateUser(requestBody)
      return data.data
    } catch (error) {
      const result = parseErrorAxios(error)
      throw rejectWithValue(result)
    }
  }
)

export const thunkLogin = createAsyncThunk<
  AuthInfoInterface,
  { params: ParamsLoginInterface },
  { rejectValue: ValidationErrorsInterface }
>('auth/login', async (props, { rejectWithValue }) => {
  const { params } = props
  try {
    const { data } = await apiLogin(params)
    return {
      access_token: data.data.access_token,
      user: data.data.user,
    }
  } catch (err) {
    const result = parseErrorAxios(err)
    return rejectWithValue(result)
  }
})

export const thunkLogout = createAsyncThunk<AuthInfoInterface>(
  'auth/thunkLogout',
  async (_props, { rejectWithValue }) => {
    try {
      const { data } = await apiLogout()
      return data.data
    } catch (err) {
      const result = parseErrorAxios(err)
      return rejectWithValue(result)
    }
  }
)

export const thunkRecoverPassword = createAsyncThunk<boolean | SerializedError, { email: string }>(
  'auth/recoverPassword',
  async (props, { rejectWithValue }) => {
    try {
      const { email } = props
      const { data } = await apiRecoverPassword(email)
      return data.data
    } catch (err) {
      const result = parseErrorAxios(err)
      throw rejectWithValue(result)
    }
  }
)

export const thunkChangePassword = createAsyncThunk<boolean | SerializedError, { newPassword: string; token: string }>(
  'auth/changePassword',
  async (props, { rejectWithValue }) => {
    try {
      const { token, newPassword } = props
      const { data } = await apiChangePassword(newPassword, token)
      return data.data
    } catch (err) {
      const result = parseErrorAxios(err)
      throw rejectWithValue(result)
    }
  }
)