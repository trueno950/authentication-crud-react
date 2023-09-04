import { createSlice } from '@reduxjs/toolkit'

import { InitialStateMe, UserInterface } from '@/interfaces'

import { logoutUser, thunkGetMe } from './thunks'

const getInitialState = (): InitialStateMe => {
  return {
    error: undefined,
    loadingUser: false,
    user: <UserInterface>{},
  }
}

export const meSlice = createSlice({
  name: 'me',
  initialState: getInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunkGetMe.pending, state => {
      if (!state.loadingUser) state.loadingUser = true
      state.error = undefined
    })
    builder.addCase(thunkGetMe.fulfilled, (state, action) => {
      const user = <UserInterface>action.payload
      state.loadingUser = false
      state.user = user
    })
    builder.addCase(thunkGetMe.rejected, state => {
      state.loadingUser = false
      state.error = { error_description: 'Ha ocurrido un error al obtener la información del usuario' }
    })

    builder.addCase(logoutUser, state => {
      state.user = <UserInterface>{}
    })
  }
})
export default meSlice.reducer
