import { createSlice } from '@reduxjs/toolkit'

import { InitialStateUsers } from '@/interfaces'

import { thunkCreateUser, thunkGetUser, thunkGetUsers } from './thunks'

const getInitialState = (): InitialStateUsers => {
  return {
    errorUser: undefined,
    loadingUser: false,
    user: undefined,

    errorUsers: undefined,
    loadingUsers: false,
    users: [],
    paging: undefined,

    errorCreatingUser: undefined,
    creatingUser: false,
    userCreated: undefined
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunkGetUser.pending, state => {
      if (!state.loadingUser) state.loadingUser = true
      state.errorUser = undefined
    })
    builder.addCase(thunkGetUser.fulfilled, (state, action) => {
      state.errorUser = undefined
      state.loadingUser = false
      state.user = action.payload
    })
    builder.addCase(thunkGetUser.rejected, state => {
      state.loadingUser = false
      state.errorUser = { error_description: 'Ha ocurrido un error al obtener la información del usuario' }
    })

    builder.addCase(thunkGetUsers.pending, state => {
      if (!state.loadingUsers) state.loadingUsers = true
      state.errorUsers = undefined
    })
    builder.addCase(thunkGetUsers.fulfilled, (state, action) => {
      state.errorUsers = undefined
      state.loadingUsers = false
      state.users = action.payload.users
      state.paging = action.payload.paging
    })
    builder.addCase(thunkGetUsers.rejected, state => {
      state.loadingUsers = false
      state.errorUsers = { error_description: 'Ha ocurrido un error al listar los usuarios' }
    })

    builder.addCase(thunkCreateUser.pending, state => {
      if (!state.creatingUser) state.creatingUser = true
      state.errorCreatingUser = undefined
    })
    builder.addCase(thunkCreateUser.fulfilled, (state, action) => {
      state.errorCreatingUser = undefined
      state.creatingUser = false
      state.userCreated = action.payload
    })
    builder.addCase(thunkCreateUser.rejected, state => {
      state.creatingUser = false
      state.errorCreatingUser = { error_description: 'Ha ocurrido un error al crear el usuario' }
    })
  }
})
export default userSlice.reducer
