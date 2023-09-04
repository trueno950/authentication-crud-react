import { createAction } from '@reduxjs/toolkit'

import { ToastInterface } from '@/interfaces'

export const thunkShowToast = createAction('toast/show', (config: ToastInterface) => {
  return {
    payload: config
  }
})
