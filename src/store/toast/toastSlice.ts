import { createSlice } from '@reduxjs/toolkit'

import { ToastInterface } from '@/interfaces'

import { thunkShowToast } from './thunks'

const getInitialState = (): ToastInterface => {
  return {
    show: false,
    type: 'failed',
    description: ''
  }
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState: getInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunkShowToast, (state, action) => {
      state.show = action.payload.show
      state.type = action.payload.type
      state.description = action.payload.description
    })
  }
})

export default toastSlice.reducer
