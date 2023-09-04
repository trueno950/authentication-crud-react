import { createSlice } from '@reduxjs/toolkit'

import { InitialStateAuth } from '@/interfaces'
import { getToken, removeToken, setToken } from '@/utils'

import {
  logout,
  thunkChangePassword,
  thunkLogin,
  thunkRecoverPassword,
  thunkRegisterUser
} from './thunks'

const getInitialState = (): InitialStateAuth => {
  const token_info = getToken()
  return {
    errorCreatingUser: undefined,
    creatingUser: false,
    userCreated: undefined,

    loading: false,
    error: undefined,
    refreshingToken: false,
    errorRefreshingToken: undefined,
    logged: !!token_info,
    token_info,

    errorRecoverPassword: undefined,
    recoveringPassword: false,
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunkRegisterUser.pending, state => {
      if (!state.creatingUser) state.creatingUser = true
      state.errorCreatingUser = undefined
    })
    builder.addCase(thunkRegisterUser.fulfilled, (state, action) => {
      state.errorCreatingUser = undefined
      state.creatingUser = false
      state.userCreated = action.payload
    })
    builder.addCase(thunkRegisterUser.rejected, state => {
      state.creatingUser = false
      state.errorCreatingUser = {
        error_description: 'Ha ocurrido un error al crear el usuario'
      }
    })

    builder.addCase(thunkLogin.pending, state => {
      if (!state.loading) state.loading = true
      state.error = undefined
    })
    builder.addCase(thunkLogin.fulfilled, (state, action) => {
      state.loading = false
      state.logged = true
      state.token_info = action.payload
      setToken(action.payload)
    })
    builder.addCase(thunkLogin.rejected, (state, action) => {
      state.loading = false
      let error_text = 'Ha occurido un error.'
      if (action.payload) {
        switch (action.payload.status) {
          case 401:
            error_text = 'No está permitido acceder aquí.'
            break
          case 404:
            error_text = 'Usuario o contraseña incorrecto.'
            break
          case 500:
            error_text = 'Ha habido un error, pruebe más tarde.'
            break
          default:
            error_text = ''
            break
        }
        state.error = {
          status: action.payload.status,
          error_code: action.payload.error_code || action.payload.error,
          error_description: error_text
        }
      } else {
        state.error = {
          error_code: action.error.code,
          error_description: error_text
        }
      }
    })

    builder.addCase(logout, state => {
      removeToken()
      state.logged = false
      state.error = undefined
      state.token_info = undefined
    })

    builder.addCase(thunkChangePassword.pending, state => {
      if (!state.recoveringPassword) state.recoveringPassword = true
      state.errorRecoverPassword = undefined
    })
    builder.addCase(thunkChangePassword.fulfilled, state => {
      state.recoveringPassword = false
    })
    builder.addCase(thunkChangePassword.rejected, state => {
      state.recoveringPassword = false
      state.errorRecoverPassword = {
        error_description: 'Ha ocurrido un error al solicitar cambiar la contraseña'
      }
    })

    builder.addCase(thunkRecoverPassword.pending, state => {
      if (!state.recoveringPassword) state.recoveringPassword = true
      state.errorRecoverPassword = undefined
    })
    builder.addCase(thunkRecoverPassword.fulfilled, state => {
      state.recoveringPassword = false
    })
    builder.addCase(thunkRecoverPassword.rejected, state => {
      state.recoveringPassword = false
      state.errorRecoverPassword = {
        error_description: 'Ha ocurrido un error al solicitar la recuperación de la contraseña'
      }
    })
  }
})
export default authSlice.reducer
